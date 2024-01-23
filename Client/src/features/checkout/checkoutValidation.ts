import * as yup from 'yup';

export const validationSchema = [yup.object({
  fullName: yup.string().required('Full name is required'),
  address1: yup.string().required('Address 1 is required'),
  address2: yup.string().required(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required'),
  country: yup.string().required('Country is required'),
}),
yup.object(),
yup.object({
  nameOnCard: yup.string().required('Card name is required'),
  // cardNumber: yup.string().required('Card number is required'),
  // expDate: yup.string().required('Expiration date is required'),
  // cvv: yup.string().required('CVV is required'),
})
];