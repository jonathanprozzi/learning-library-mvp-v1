import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Select,
  VisuallyHidden,
} from '@chakra-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RequestForm = () => {
  const [isSending, setSending] = useState(false);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    // contactOptIn: Yup.bool().oneOf(
    //   [false],
    //   "You'll be asked for your email or phone number for us to contact you."
    // ),
    contactOptIn: Yup.bool(),
    phone: Yup.string()
      .nullable()
      .matches(phoneRegExp, 'Phone number is not valid. Please try again.'),
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    // .required("Required"),
    email: Yup.string().email('Invalid email'),
    category: Yup.string().required('This field is required'),
  });

  const handleSubmit = async (values) => {
    setSending(true);
    const { category, contactOptIn, name, email, phone } = values;

    alert(JSON.stringify(values, null, 2));
    const res = await fetch('/api/records/createResource', {
      method: 'POST',
      body: JSON.stringify({
        category: category,
        contactOptIn: contactOptIn === true ? 'Yes' : 'No',
        name: name || '',
        email: email || '',
        phone: phone || '',
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const apiResponse = await res.json();
    console.log('response', apiResponse);
    if (apiResponse) {
      setSending(false);
      alert('sent!');
    }
  };

  // TODO: pull this from live data using a Set
  const availableCategories = [
    'Computer Science',
    'Fabrication',
    'Communication',
    'Design',
    'Electronics',
    'Privacy & Security',
    'Professional Development',
    'Service',
    'Tech Literacy',
    'General Education',
    'Digital Wellbeing',
    'Financial Aids & Scholarships',
    'Events',
    'Other',
  ];

  return (
    <Box marginY={8} padding={4} borderWidth="1px" borderRadius="md">
      <VisuallyHidden>
        <Heading as="h3" size="lg">
          Request Form
        </Heading>
      </VisuallyHidden>
      <Formik
        initialValues={{
          category: '',
          contactOptIn: false,
          phone: '',
          name: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <Form>
            <Field name="category">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.category && form.touched.category}
                >
                  <FormLabel htmlFor="category">
                    Category Request (required)
                  </FormLabel>
                  <Select
                    {...field}
                    id="category"
                    placeholder=""
                    marginBottom={4}
                  >
                    {availableCategories.map((categoryName) => (
                      <option value={categoryName}>{categoryName}</option>
                    ))}
                  </Select>

                  <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="contactOptIn">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.contactOptIn && form.touched.contactOptIn
                  }
                >
                  <FormLabel htmlFor="contactOptIn">Contact Opt In</FormLabel>
                  <Checkbox
                    {...field}
                    id="contactOptIn"
                    placeholder=""
                    marginBottom={4}
                  >
                    Contact Me
                  </Checkbox>
                  <FormErrorMessage>
                    {form.errors.contactOptIn}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {values.contactOptIn === true ? (
              <>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name (optional)</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Please enter your name if you'd like"
                        marginBottom={4}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email (optional)</FormLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Please enter your email if you'd like"
                        marginBottom={4}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="phone">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.phone && form.touched.phone}
                    >
                      <FormLabel htmlFor="phone">
                        Phone Number (optional)
                      </FormLabel>
                      <Input
                        {...field}
                        id="phone"
                        placeholder="Please enter your phone number if you'd like"
                      />
                      <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </>
            ) : null}

            <Button
              marginTop={4}
              colorScheme="purple"
              variant="outline"
              isLoading={isSending}
              type="submit"
            >
              Send Request
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RequestForm;
