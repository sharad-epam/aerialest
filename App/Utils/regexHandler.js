import PropTypes from 'prop-types'

export const checkPatternWithExpressionAndString = (
  regexPattern,
  { firstName, lastName, email, password }
) => {
  const regex = new RegExp(regexPattern)
  const isValidRegex =
    firstName.match(regex) &&
    lastName.match(regex) &&
    email.match(regex) &&
    password.match(regex)
  return isValidRegex
}
checkPatternWithExpressionAndString.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
