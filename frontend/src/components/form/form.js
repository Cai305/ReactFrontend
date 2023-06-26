import React , { useState } from "react";
import data from "./data.json";
import { Formik, Field, Form, useFormik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';

function Forms() {

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value)
  };


  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .required('Company name is required')
      .min(2, 'Company name must be at least 2 characters')
      .max(50, 'Company name can have a maximum of 50 characters'),
  });

  // eslint-disable-next-line no-undef
  const formik = useFormik({

    initialValues: {
      picked: '',
      companyName: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      {/* Render the questions */}

      {data.questions.map((question) => (
        <div key={question.code}>
          {question.code === "Q1" ? (
            
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                {question.text}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  name="picked"
                  value="true"
                  checked={selectedOption === 'true'}
                  onChange={handleOptionChange}
                  control={<Radio />}
                  label={question.trueLabel}
                />
                <FormControlLabel
                  name="picked"
                  value="false"
                  checked={selectedOption === 'false'}
                  onChange={handleOptionChange}
                  control={<Radio />}
                  label={question.falseLabel}
                />
              </RadioGroup>
            </FormControl>
          ) :  selectedOption = "true" ?  (
            <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.companyName && formik.errors.companyName ? (
          <div>{formik.errors.companyName}</div>
        ) : null}
      </div>
        <button type="submit">Submit</button>
            </form>
          ): <p></p>}
        </div>
      ))}
    </div>
  );
}

export default Forms;
