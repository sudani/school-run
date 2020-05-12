import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IDriver } from "../../app/models/driver";
import { v4 as uuid } from "uuid";
import DriverStore from "../../app/stores/driverStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";

interface DetailPrams {
  id: string;
}

const NewDriverForm: React.FC<RouteComponentProps<DetailPrams>> = ({
  match,
  history,
}) => {
  const driverStore = useContext(DriverStore);
  const {
    createDriver,
    editDriver,
    submitting,
    loadDriver,
    driver: initialFormState,
    clearDriver,
  } = driverStore;

  const [driver, setdriver] = useState<IDriver>({
    id: "",
    name: "",
    addres1: "",
    addres2: "",
    city: "",
    postCode: "",
    telphone: "",
  });

  useEffect(() => {
    if (match.params.id && driver.id.length === 0) {
      loadDriver(match.params.id).then(
        () => initialFormState && setdriver(initialFormState)
      );
    }
    return () => {
      clearDriver();
    };
  }, [
    loadDriver,
    clearDriver,
    match.params.id,
    initialFormState,
    driver.id.length,
  ]);

  //method handling submitting the form to datbase
  // const handleSubmit = () => {
  //     if (driver.id.length === 0) {
  //         let newDriver = {
  //             ...driver,
  //             id: uuid()
  //         }
  //         createDriver(newDriver).then(() =>
  //             history.push(`/driver/${newDriver.id}`));
  //     } else {
  //         editDriver(driver).then(() => history.push(`/driver/${driver.id}`));
  //     }
  // }

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  component={TextInput}
                  name="name"
                  value={driver.name}
                  placeholder="Name"
                />
                <Field
                  component={TextInput}
                  name="addres1"
                  value={driver.addres1}
                  placeholder="Address"
                />
                <Field
                  component={TextAreaInput}
                  name="addres2"
                  value={driver.addres2}
                  placeholder="Address 2"
                />
                <Field
                  component={TextInput}
                  name="city"
                  value={driver.city}
                  placeholder="City"
                />
                <Field
                  component={TextInput}
                  name="postCode"
                  value={driver.postCode}
                  placeholder="post code"
                />
                <Field
                  component={TextInput}
                  name="telphone"
                  value={driver.telphone}
                  placeholder="telephone"
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/driver")}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default NewDriverForm;
