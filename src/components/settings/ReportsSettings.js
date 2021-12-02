import { useContext, useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { eventReport, hoursReport } from 'src/utils/reports/events';
import { birthdaysReport, shirtSizesReport } from 'src/utils/reports/users';
import { CSVLink } from 'react-csv';
import { DashboardContext } from '../DashboardLayout';

const ReportsSettings = (props) => {
  const { eventSignups, events, users } = useContext(DashboardContext);
  const [reportType, setReportType] = useState(null);
  const [reportData, setReportData] = useState([]);
  const csvLink = useRef();

  const REPORT_TYPE_MAP = {
      'Hours Volunteered': hoursReport(eventSignups, events, users),
      Events: eventReport(),
      Birthdays: birthdaysReport(),
      'Shirt Sizes': shirtSizesReport(),
  };

  const handleReportChange = (event) => {
    const report = event.target.value;

    setReportType(report);
    setReportData(REPORT_TYPE_MAP[report]);
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Download a report"
          title="Reports"
        />
        <Divider />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              value={reportType}
              label="Report Type"
              onChange={handleReportChange}
            >
              {Object.keys(REPORT_TYPE_MAP).map((type) => <MenuItem value={type}>{type}</MenuItem>)}
            </Select>
          </FormControl>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <CSVLink
            data={reportData}
            filename="report.csv"
            ref={csvLink}
            target="_blank"
          >
            <Button
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          </CSVLink>
        </Box>
      </Card>
    </form>
  );
};

export default ReportsSettings;
