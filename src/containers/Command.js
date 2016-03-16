import React, { Component, PropTypes } from 'react'

export default class Command extends Component {
   constructor(props) {
      super(props);
   }

   processUrl(url){
      var array = [];

      var  _url = String(url) ;
      if(url.startsWith("http://www.")) {
         array.push(this.leadingZero(Number(0).toString(16)));
         _url = url.substr("http://www.".length)
      } else if (url.startsWith("https://www.")) {
         array.push(this.leadingZero(Number(1).toString(16)));
         _url = url.substr("https://www.".length)
      } else if (url.startsWith("http://")) {
         array.push(this.leadingZero(Number(2).toString(16)));
         _url = url.substr("http://".length)
      } else if (url.startsWith("https://")) {
         array.push(this.leadingZero(Number(3).toString(16)));
         _url = url.substr("https://".length)
      }

      var char_remaining = _url.length;
      while(char_remaining > 0){
         if(_url.startsWith(".com/")) {
            array.push(this.leadingZero(Number(0).toString(16)));
            var skip = ".com/".length; 
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".org/")) {
            array.push(this.leadingZero(Number(1).toString(16)));
            var skip = ".org/".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".edu/")) {
            array.push(this.leadingZero(Number(2).toString(16)));
            var skip = ".edu/".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".net/")) {
            array.push(this.leadingZero(Number(3).toString(16)));
            var skip = ".net/".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".info/")) {
            array.push(this.leadingZero(Number(4).toString(16)));
            var skip = ".info/".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".biz/")) {
            array.push(this.leadingZero(Number(5).toString(16)));
            var skip = ".biz/".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".gov/")) {
            array.push(this.leadingZero(Number(6).toString(16)));
            var skip = ".gov/".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".com")) {
            array.push(this.leadingZero(Number(7).toString(16)));
            var skip = ".com".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".org")) {
            array.push(this.leadingZero(Number(8).toString(16)));
            var skip = ".org".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".edu")) {
            array.push(this.leadingZero(Number(9).toString(16)));
            var skip = ".edu".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".net")) {
            array.push(this.leadingZero(Number(10).toString(16)));
            var skip = ".net".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".info")) {
            array.push(this.leadingZero(Number(11).toString(16)));
            var skip = ".info".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".biz")) {
            array.push(this.leadingZero(Number(12).toString(16)));
            var skip = ".biz".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         } else if(_url.startsWith(".gov")) {
            array.push(this.leadingZero(Number(13).toString(16)));
            var skip = ".gov".length;
            _url = _url.substr(skip);
            char_remaining = char_remaining - skip;
            continue;
         }
         
         //var letter = _url.codePointAt(0); // else try charCodeAt()
         var letter = _url.charCodeAt(0).toString(16);
         array.push(this.leadingZero(letter));
         _url = _url.substr(1);
         char_remaining = char_remaining - 1;
         
      }
      return array;
   }

   leadingZero(v) {
         if(v.length === 2 ) {
            return v;
         } else if (v.length === 1){
            return "0"+v;
         } else {
            return "error";
         }
   }

   render(){
    var base = [];

    base.push("0x08");   //0
    base.push("0x0008"); //1
    base.push("");       //2
    base.push("02");     //3
    base.push("01");     //4
    base.push("06");     //5
    base.push("03");     //6
    base.push("03");     //7
    base.push("aa");     //8
    base.push("fe");     //9
    base.push("");       //10
    base.push("16");     //11
    base.push("aa");     //12
    base.push("fe");     //13
    base.push("10");     //14
    base.push("00");     //15
   

    var processedUrl = this.processUrl(this.props.url);
    var retval = base.concat(processedUrl);
    retval[2] = this.leadingZero(Number(retval.length - 3).toString(16));
    retval[10] = this.leadingZero(Number(retval.length - 11).toString(16));

    var retcomp = <div />
    if(processedUrl.length === 0) {
       commandstring = "Enter a URL above."; 

       retcomp = <div className="callout alert">{commandstring}</div>;
    } else if(retval.length <= 34){
       var commandstring = ""
       for(var j=retval.length; j<34; j++){
          retval.push("00");     
       }
       for(var i = 0; i< retval.length ; i++){
          commandstring = commandstring + retval[i] +" ";
       }
       commandstring = commandstring.trim();
       retcomp = (
              <div className="callout secondary">
                 <h5>Your commands for "{this.props.url}" are:</h5>
                 <p>$ sudo hciconfig hci0 up</p>
                 <p>$ sudo hciconfig hci0 leadv 3</p>
                 <p>$ sudo hcitool -i hci0 cmd {commandstring}</p>
              </div>
       );
    } else {
       var toolong = (retval.length - 34 )
       commandstring = "Your URL is too long by " + String(toolong) + ((toolong===1) ? " byte" : " bytes"); 

       retcomp = <div className="callout alert">{commandstring}</div>;
    }

    return (
       retcomp
    )
   }
}

