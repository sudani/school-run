import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { DriverFormValues } from "../../app/models/driver";
import { v4 as uuid } from "uuid";
import DriverStore from "../../app/stores/driverStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
const validate = combineValidators({
  name: isRequired({ message: "Driver name is required" }),
  addres1: isRequired({ message: "address is required" }),
  postCode: isRequired({ message: "address postcode is required" }),
  city: isRequired({ message: "City is required" }),
  telphone: isRequired({ message: "Driver telephone is required" }),
});

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
    clearDriver,
  } = driverStore;

  const [driver, setdriver] = useState(new DriverFormValues());

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadDriver(match.params.id)
        .then((driver) => setdriver(new DriverFormValues(driver)))
        .finally(() => setLoading(false));
    }
  }, [loadDriver, clearDriver, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...driver } = values;

    if (!driver.id) {
      let newDriver = {
        ...driver,
        id: uuid(),
      };

      createDriver(newDriver);
    } else {
      editDriver(driver);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={driver}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                  disabled={loading || invalid || pristine}
                />
                <Button
                  onClick={
                    driver.id
                      ? () => history.push(`/driver/${driver.id}`)
                      : () => history.push("/driver")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
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
