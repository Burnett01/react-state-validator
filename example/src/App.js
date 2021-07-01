

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { 
  Form, 
  FormGroup,
  FormFeedback,
  Label, 
  Input, 
  Row, 
  Col 
} from 'reactstrap';

import { StateValidator } from '@burnett01/react-state-validator';

export class App extends StateValidator {
  /**
   * @param {any} props
   */
  constructor(props) {
    super(props);
    /**
     * The component state.
     */
    this.state = {
      firstname: '',
      gender: 'male',
      dateofbirth: '',
      postcode: '',
      pregnancy: ''
    };
    /**
     * Rules setup for validation.
     */
    this.validationRules({
      firstname: { 
        minLen: 4,
        maxLen: 50,
      },
      gender: { 
        has: ['male', 'female', 'diverse'],
      },
      dateofbirth: {
        regex: /^\d{4}-\d{2}-\d{2}$/
      },
      postcode: {
        len: 5
      },
      pregnancy: {
        notIf: [{ field: 'gender', value: 'male' }],
        has: ['yes', 'no', 'maybe'],
      }
    });
  }
  /**
   * onChange event handler.
   * @param {Event}
   */
  onChange = ({ target: { name, value }}) => {
    this.setStateValidate(name, value)
  }
  /**
   * onBlur event handler.
   * @param {Event}
   */
  onBlur = ({ target: { name, value }}) =>
    this.setStateValidate(name, value);
  /**
   * onClick event handler.
   * @param {Event}
   */
  onClick = ({ target: { name, value }}) =>
    this.setStateValidate(name, value);

  /**
   * Render method.
   */
  render() {
    return (
      <div>
        <p>Your data:</p>
        <Form>
          <FormGroup>
            <Label for="firstname">Firstname</Label>
            <Input
              type="text" 
              onBlur={this.onBlur}
              name="firstname"
              id="firstname" 
              {...this.isValid('firstname')}
              />
              <FormFeedback>
                A text between 4 and 50 characters
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="gender">Gender</Label>
            <Input 
              type="select" 
              onChange={this.onChange}
              name="gender"
              id="gender"
              {...this.isValid('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="diverse">Diverse</option>
            </Input>
            <FormFeedback>
              One of male, female or diverse
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="dateofbirth">Date of birth</Label>
            <Input 
              type="date" 
              name="dateofbirth" 
              id="dateofbirth"
              onBlur={this.onBlur}
              {...this.isValid('dateofbirth')}/>
              <FormFeedback>
                DOB must be in format DD.MM.YYYY
              </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg="3">
                <Label for="postcode">Postcode</Label>
                <Input 
                  type="number" 
                  min="00000"
                  max="99999"
                  step="1" 
                  placeholder="PLZ"
                  name="postcode" 
                  id="postcode"
                  onBlur={this.onBlur}
                  {...this.isValid('postcode')}/>
                  <FormFeedback>
                    A number between 00000 and 99999
                  </FormFeedback>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>);
  }
}

export default App;
