export default {
  countSymbols(login, min, max) {
    if (login.length < min || login.length > max) {
      return false;
    } else {
      return true;
    }
  },
  withoutNumbers(value) {
    const re = /^[\sA-Za-zА-яа-я]+$/
    if (re.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  email(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}