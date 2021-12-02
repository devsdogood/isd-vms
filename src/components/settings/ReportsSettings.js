import { useState } from 'react';
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

const ReportsSettings = (props) => {
  const REPORT_TYPE_MAP = {
      'Hours Volunteered': hoursReport(),
      Events: eventReport(),
      Birthdays: birthdaysReport(),
      'Shirt Sizes': shirtSizesReport(),
  };

  const [reportType, setReportType] = useState(null);

  const downloadReport = () => {
    console.log(REPORT_TYPE_MAP[reportType]);
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
              onChange={(event) => setReportType(event.target.value)}
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
          <Button
            color="primary"
            variant="contained"
            onClick={downloadReport}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ReportsSettings;
