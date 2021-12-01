import * as Yup from 'yup';

const rolesSchema = Yup.object().shape({
  roles: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required()
    })
  )
});

export default rolesSchema;
