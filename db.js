module.exports = class db {
  //sitoj funkcijoj reikia susijungt su duombaze ir surasyt visokius nustatymus, jeigu reikia
  init() {
    console.log("database initialized!");
  }

  //return 0 - successful login
  //return
  //data format:              data{username, password, confirmPassword}
  confirmLogin(data) {
    //is duombazes reik istraukt prisijungimo duomenis ir patikrint, ar sutampa su naudotojo ivestais duomenim ("data")
    //jei prisijungimas sekmingas, funkcija grazina 0, jei ne - 1 ar koki kitoki errorCode, kuri nusistatysi kaip nori. svarbu pazymek komentaruose, ka kas reiskia
  }

  //creates new user if username and password are valid
  //return 0 - successful creation
  //return 1 - username too short (min 6 characters)
  //return 2 - password too short (min 8 characters)
  //return 3 - password confirmPassword doesnt match
  //return 4 - username taken
  //data format:              data{username, password, confirmPassword}
  createNewUser(data) {
    if (data[0].length > 5 && data[1].length > 7 && data[1] == data[2]) {
      //TODO: reikia parasyt kodo dali, kuri patikrintu ar username'as duombazej yra ar ne (jei yra => return 4;)

      //if program reaches this line of code, username was successfully created
      //duomenys permetami i duombaze
      return 0;
    } else {
      if (data[0].length < 6) {
        return 1;
      } else if (data[1] < 8) {
        return 2;
      } else if (data[1] != data[2]) {
        return 3;
      }
    }
  }
};
