(function(){

  'use strict';

  angular.module('slider',['ngAnimate'])

    .controller('SliderController',SliderController);


  function SliderController($scope,$interval,$timeout){

    var self = this;

    //init variables

    //keep an indicator to break the $Interval function when a button is pressed to
    //custom navigate the slider
    self.break = false;

    //image array
    self.imgArr = [
      {
        path : 'img/1.jpg',
        desc : 'Lorem Ipsum'
      }, {
        path : 'img/2.jpg',
        desc : 'Lorem Ipsum'
      }, {
        path : 'img/3.jpg',
        desc : 'Lorem Ipsum'
      }, {
        path : 'img/4.jpg',
        desc : 'Lorem Ipsum'
      }, {
        path : 'img/5.jpg',
        desc : 'Lorem Ipsum'
      }, {
        path : 'img/6.jpg',
        desc : 'Lorem Ipsum'
      },

    ];

    //object maintaining the indexes of the array to be shown on display
    self.view = {
      first : 0,
      second : 1,
      third : 2
    };

    //set the micro seconds for the interval
    self.interval = 3000;

    //init buttons array
    self.buttons = [];

    self.classVal = 0;

    //default automatic function calling at an interval
    function slider(){

      $interval(function(){

        if(!self.break){
          carousel();
          console.log("interval");
        }
      },self.interval);

    }

    //init the function 
    slider();

    //once the default interval is stopped, renable the default interval animation
    function setBreak(){

      if(self.break){
        $timeout(function(){
          self.break = false;
        },4000);

      }

    }

    //image carousal main function
    function carousel(){

      //view ojbject is inncremented to change the images on display
      self.view.first = (self.view.first++ >= (self.imgArr.length - 1))? 0 : self.view.first;
      self.view.second = (self.view.second++ >= (self.imgArr.length - 1))? 0 : self.view.second;
      self.view.third = (self.view.third++ >= (self.imgArr.length - 1))? 0 : self.view.third;


      /* if(self.view.third == 0){    
      self.view.first = 0;
      self.view.second = 1;
      self.view.third = 2; 

      } */

      //console.log("slider",self.view);

    }

    //navigate to next image through button click
    self.next= function(){

      self.break = true;
      carousel();
      setBreak();

    };

    //navigate to previous image through btn click
    self.prev = function(){

      self.break = true;
      self.view.first = (self.view.first-- < (0))? self.imgArr.length - 1 : self.view.first;
      self.view.second = (self.view.second-- < (0))? self.imgArr.length - 1 : self.view.second;
      self.view.third = (self.view.third-- < (0))? self.imgArr.length - 1 : self.view.third;

      setBreak();
    };


    function defineBtns(){
      self.buttons = [];
      var val =  Math.ceil(self.imgArr.length / 3);

      for(var i =0; i<val;i++){

        self.buttons.push(i);

      }

    }

    defineBtns();

    self.switch = function(index){

      self.break = true;
      index = index * 3;
      self.view.first = index;
      index =index++ > (self.imgArr.length - 1)? 0  :index;


      self.view.second = index;

      index =index++ > (self.imgArr.length - 1)? 0  :index;
      self.view.third =  index;

      setBreak();

    };


    //set btn class
    function setClass(){

      $interval(function(){

        //self.classVal;

        var val =  Math.floor(self.view.third/3);
        
        console.log("val",val);
        var divFactor = (val%3 == 0)?true:false;

          console.log("div",divFactor);
        self.classVal = (val == 0)?0:(divFactor)?(val-1):val;

      },1000);


    }

     setClass();


  }


})();