/*
* The MIT License (MIT)
*
* Product:      react-state-validator
* Description:  A state props validator.
*
* Copyright (c) 2021 Steven Agyekum <agyekum@posteo.de>
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software
* and associated documentation files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies
* or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
* TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/
import React from 'react'
/**
 * A state props validator.
 * @class
 */
export class StateValidator extends React.Component {
  /**
   * Creates an instance.
   * @param {Object} props 
   */
  constructor (props) {
    super(props)
    this.rules = {}
  }
  /**
   * Sets the rules for validation.
   * Also adds rules as props to state.
   * @context Before component was mounted
   * @param {Object} rules - The rules
   */
  validationRules (rules) {
    this.state.validated = {}
    for (const prop in rules)
      this.state.validated[prop] = null
    this.rules = rules
  }
  /**
   * Validates a prop in state.
   * @context After component was mounted
   * @param {String} prop - The prop
   * @returns {Boolean} - true/false
   */
  validateState (prop) {
    const state = this.state
    const value = state[prop]
    const rules = this.rules
    if (!(prop in rules)) return true
    let {
      len,
      minLen,
      maxLen,
      min,
      max,
      regex,
      has,
      notIf
    } = rules[prop]
    let isValid = false
    let [
      validMinLen = false,
      validMaxLen = false,
      validMin = false,
      validMax = false
    ] = []
  
    if (notIf && notIf.filter(({field, value}) => {
      return state[field] === value}).length) return true
    if (len) isValid = value.length === len
    if (minLen) isValid = validMinLen = value.length >= minLen
    if (maxLen) isValid = validMaxLen = value.length <= maxLen
    if (minLen && maxLen) isValid = validMinLen && validMaxLen
    if (min) isValid = validMin = value >= min
    if (max) isValid = validMax = value <= max
    if (min && max) isValid = validMin && validMax
    if (regex) isValid = regex.test(value)
    if (has) isValid = has.includes(value)

    const validated = this.state.validated
    validated[prop] = isValid
    this.setState({ validated })
    return isValid
  }
  /**
   * Sets state and validates it.
   * Helper method.
   * @param {String} prop - The state prop
   * @param {any} value - The value
   * @async
   */
  async setStateValidate (prop, value) {
    await this.setState({ [prop]: value })
    await this.validateState(prop)
  }
  /**
   * UI-binding to JSX for visual validation.
   * Helper method.
   * @param {String} name - The state prop
   */
  isValid (name) {
    const state = this.state.validated[name];
    return { 
      invalid: (state != null && !state), 
      valid: state
    };
  }
}
