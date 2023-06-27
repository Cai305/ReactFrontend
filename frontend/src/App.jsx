import { useFormik } from "formik";
import { useState } from "react";
import data from "./assets/questions.json";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const App = () => {
  const { questions } = data;  //Deconstructing my objects
  const [option, setOption] = useState(false); //Setting my options state
  const [inputDisabled,setInputDisabled] = useState(true); //


  //Validation Function using yup
  const validationSchema = yup.object({
    Q2: yup
      .string("Enter your password")
      .min(2, "Text should be of minimum 2 characters length")
      .required("This field is required"),
  });

  const formik = useFormik({

    initialValues: {
      Q1: "",
      Q2: "",
    },
    validationSchema: validationSchema, //validation schema
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //Converting my values from a string to boolean since when i get i get them as strings (eg: "true") 
  const handleOptionChange = (e) => {
    let myOption = e.target.value.length == 4 ? true : false;
    if(myOption === true){
      setInputDisabled(false);
    }else{
      setInputDisabled(true);
    }
    setOption(myOption);
  };

  return (
    <div className="container myStyle">
      <div className="child">
        <form onSubmit={formik.handleSubmit}>
          {questions?.map((question) => {
            return question.type == "bool" ? (
              <div key={question.code}>
                <div id={question.code}>{question.text}</div>

                <Stack direction="row" spacing={2}>
                  <div className="radioButton">
                    <input
                      type="radio"
                      name={question.code}
                      value={true}
                      onChange={formik.handleChange}
                      onClick={(e) => handleOptionChange(e)}
                    />
                    <label htmlFor="age1">{question.trueLabel}</label>
                  </div>

                  <div className="radioButton">
                    <input
                      type="radio"
                      name={question.code}
                      value={false}
                      onChange={formik.handleChange}
                      onClick={(e) => handleOptionChange(e)}
                    />
                    <label htmlFor="age1">{question.falseLabel}</label>
                  </div>
                </Stack>
              </div>
            ) : (
             
                <div key={question.code}>
                 
                    <>
                      <div id={question.code}>{question.text}</div>
                      <TextField
                        id={question.code}
                        name={question.code}
                        type="text"
                        placeholder={question.placeholder}
                        onChange={formik.handleChange}
                        label="Standard"
                        variant="standard"
                        InputProps={{
                              readOnly: inputDisabled,
                          }}
                        error={formik.touched.Q2 && Boolean(formik.errors.Q2)}
                        helperText={formik.touched.Q2 && formik.errors.Q2}
                      />
                    </>
                 
                </div>
             
            );
          })}
          {/* <Button type="submit" variant="contained">
            Save
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default App;
