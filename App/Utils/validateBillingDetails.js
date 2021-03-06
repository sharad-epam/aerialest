import PropTypes from 'prop-types'

export const checkPatternWithExpressionAndString = (
  regexPattern,
  {
    firstName,
    lastName,
    email,
    street,
    city,
    zipCode,
    country,
    telephone,
    region_id,
    region
  }
) => {
  const regex = new RegExp(regexPattern)
  const isValidRegex =
    firstName.match(regex) &&
    lastName.match(regex) &&
    email.match(regex) &&
    street.match(regex) &&
    city.match(regex) &&
    region_id.match(regex) &&
    region.match(regex) &&
    zipCode.match(regex) &&
    country.match(regex) &&
    telephone.match(regex)
  return isValidRegex
}
checkPatternWithExpressionAndString.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  addState: PropTypes.string.isRequired,
  zipCode: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  telephone: PropTypes.number.isRequired
}
