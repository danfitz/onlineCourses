(function(global, $) {

  const Greetr = function Greetr(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };
  
  const supportedLangs = ["en", "fr"];
  
  const greetings = {
    en: "Hey",
    fr: "Bonjour"
  };
  
  const logMessages = {
    en: "Logged in",
    fr: "En logg"
  };
  
  Greetr.init = function(firstName, lastName, language) {
    this.firstName = firstName || "Default";
    this.lastName = lastName || "Default";
    this.language = language || "en";

    this.validate();
  };
  
  Greetr.init.prototype = Greetr.prototype = {
    
    fullName: function() {
      return this.firstName + " " + this.lastName;
    },
    
    validate: function() {
      if (supportedLangs.indexOf(this.language) === -1) throw "Invalid language";
    },

    greeting: function() {
      return greetings[this.language] + " " + this.firstName + "!";
    },
    
    greet: function() {
      const msg = this.greeting();
      
      if (console) console.log(msg);
      
      // for chaining methods
      return this;
    },
    
    log: function() {
      if (console) console.log(logMessages[this.language] + ": " + this.fullName);
      
      return this;
    },
    
    setLang: function(newLang) {
      this.language = newLang;
      this.validate();
      
      return this;
    },

    setGreet: function(selector) {
      if (!$) throw "jQuery not loaded";

      if (!selector) throw "Missing jQuery selector";

      $(selector).text(this.greeting());

      return this;
    }
  };
  
  global.Greetr = global.G$ = Greetr;

})(window, jQuery);