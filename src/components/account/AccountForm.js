import {
  Grid,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { FormikProvider } from 'formik';
import states from 'src/utils/data/states';
import { shirtSizes } from '../../utils/schemas/user';

const AccountForm = ({ formik, addPassword }) => (
  <FormikProvider
    value={formik}
  >
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          name="firstName"
          variant="outlined"
          label="First Name"
          {...formik.getFieldProps('firstName')}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          name="lastName"
          variant="outlined"
          label="Last Name"
          {...formik.getFieldProps('lastName')}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          name="email"
          variant="outlined"
          label="Email"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          name="phone"
          variant="outlined"
          label="Phone Number"
          {...formik.getFieldProps('phone')}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          name="address1"
          variant="outlined"
          label="Address 1"
          {...formik.getFieldProps('address1')}
          error={formik.touched.address1 && Boolean(formik.errors.address1)}
          helperText={formik.touched.address1 && formik.errors.address1}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
      >
        <TextField
          fullWidth
          name="address2"
          variant="outlined"
          label="Address 2"
          {...formik.getFieldProps('address2')}
          error={formik.touched.address2 && Boolean(formik.errors.address2)}
          helperText={formik.touched.address2 && formik.errors.address2}
        />
      </Grid>
      <Grid
        item
        md={4}
        xs={8}
      >
        <TextField
          fullWidth
          name="city"
          variant="outlined"
          label="City"
          {...formik.getFieldProps('city')}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </Grid>
      <Grid
        item
        xs={4}
      >
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            htmlFor="outlined-state-select"
            shrink
          >
            State
          </InputLabel>
          <Select
            fullWidth
            name="state"
            variant="outlined"
            label="State"
            options={Object.values(states)}
            {...formik.getFieldProps('state')}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            inputProps={{
                      id: 'outlined-state-select',
                    }}
          >
            {
                      Object.values(states).map((s) => <MenuItem value={s}>{s}</MenuItem>)
                    }
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
      >
        <TextField
          fullWidth
          name="zip"
          variant="outlined"
          label="ZIP Code"
          {...formik.getFieldProps('zip')}
          error={formik.touched.zip && Boolean(formik.errors.zip)}
          helperText={formik.touched.zip && formik.errors.zip}
        />
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
      >
        <TextField
          fullWidth
          name="occupation"
          variant="outlined"
          label="Occupation"
          {...formik.getFieldProps('occupation')}
          error={formik.touched.occupation && Boolean(formik.errors.occupation)}
          helperText={formik.touched.occupation && formik.errors.occupation}
        />
      </Grid>
      <Grid
        item
        xs={6}
      >
        <TextField
          fullWidth
          name="birthday"
          variant="outlined"
          label="Birthday"
          type="date"
          defaultValue="2000-01-01"
          {...formik.getFieldProps('birthday')}
          error={formik.touched.birthday && Boolean(formik.errors.birthday)}
          helperText={formik.touched.birthday && formik.errors.birthday}
        />
      </Grid>
      <Grid
        item
        md={2}
        xs={6}
      >
        <FormControl variant="outlined" fullWidth>
          <InputLabel
            htmlFor="outlined-shirt-select"
            shrink
          >
            T-Shirt Size
          </InputLabel>
          <Select
            fullWidth
            name="shirtSize"
            variant="outlined"
            label="T-Shirt Size"
            options={Object.values(states)}
            {...formik.getFieldProps('shirtSize')}
            error={formik.touched.shirtSize && Boolean(formik.errors.shirtSize)}
            helperText={formik.touched.shirtSize && formik.errors.shirtSize}
            inputProps={{
                      id: 'outlined-shirt-select',
                    }}
          >
            {
                      Object.values(shirtSizes).map((s) => <MenuItem value={s}>{s}</MenuItem>)
                    }
          </Select>
        </FormControl>
      </Grid>
      {addPassword
         && (
         <>
           <Grid
             item
             md={6}
             xs={12}
           >
             <TextField
               fullWidth
               name="password"
               variant="outlined"
               label="Password"
               type="password"
               {...formik.getFieldProps('password')}
               error={formik.touched.password && Boolean(formik.errors.password)}
               helperText={formik.touched.password && formik.errors.password}
             />
           </Grid>
           <Grid
             item
             md={6}
             xs={12}
           >
             <TextField
               fullWidth
               name="confirmPassword"
               variant="outlined"
               label="Confirm Password"
               type="password"
               {...formik.getFieldProps('confirmPassword')}
               error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
               helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
             />
           </Grid>
         </>
)}
    </Grid>
  </FormikProvider>
  );

export default AccountForm;
