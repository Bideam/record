  var ul=document.getElementsByTagName('ul');
  var inner=document.getElementsByClassName('inner')[0];
  var li=document.getElementsByClassName('active')[0];
  var needl=document.getElementsByClassName('needle')[0];
  var position=needl.offsetLeft-li.offsetWidth/2;
  var the_li=document.getElementsByClassName('pos');
  var left_arrow=document.getElementsByClassName('left-arrow')[0];
  var right_arrow=document.getElementsByClassName('right-arrow')[0];
  var last_li=ul[1].getElementsByTagName('li');
  var counts=0;
  ul[0].style.transform="translateX("+(position)+"px)";
  ul[1].style.transform="translateX(0px)";
  var transform;
  var transX;
  var t_trans;
  var xhr;
  
  xhr = new XMLHttpRequest();      
  left_arrow.onclick=function(){
    transform=ul[1].style.transform;
    transX=transform.match(/translateX\((.*?)\)/);
    t_trans=parseInt(transX[1]);
    
    counts++;
    if (t_trans >= 0) {
      counts=-(last_li.length-2);
    }
    ul[1].style.transform="translateX("+counts*220+"px)";
  }
  
  right_arrow.onclick=function(){
    transform=ul[1].style.transform;
    transX=transform.match(/translateX\((.*?)\)/);
    t_trans=parseInt(transX[1]);

    counts--;

    if (t_trans <= -(last_li.length-2)*220) {
      counts=0;
    }
    ul[1].style.transform="translateX("+counts*220+"px)";
    
    
  }
if(!Detector.webgl){
      Detector.addGetWebGLMessage();
} else {
  var count;
  var years = ['1990','1995','2000','2001'];
  var container = document.getElementById('container');
  var globe = new DAT.Globe(container);
      
  //console.log(globe);
  var i, tweens = [];
      
  var settime = function(globe, t,count) {
    return function() {
      
      new TWEEN.Tween(globe).to({time: t/count},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
      
    };
  };
      
      
  getdata();
  
  TWEEN.start();
  
  xhr.open('GET', 'data/xray.json', true);
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        window.data = data;
        
        loaddata(data);
        
      }
    }

  };
  xhr.send(null);
}
  
function loaddata(data){
var url; 
  count=data.length
  for (i=0;i<data.length;i++) {
    globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
  }
            
  globe.createPoints();
  settime(globe,0,count)();
  globe.animate();
  document.body.style.backgroundImage = 'none'; // remove loading
  for (var i = 0; i < the_li.length; i++) {
    var th_li=the_li[i];
    (function(o,t){
      o.onclick=function(){
        url="data/data"+t+".json";

        getdata(url);
        
        settime(globe,t,count)();
        ul[0].style.transform="translateX("+(position-t*(li.offsetWidth+3))+"px)";
        for (var i = 0; i < the_li.length; i++) {
          if (i==t) {
            the_li[i].setAttribute('class','pos active');
          }else{
            the_li[i].setAttribute('class','pos');
          }
        }
      }
    })(th_li,i);
    
  }
  
}
  
function getdata(url){
  ul[1].innerHTML='';
  var xhr1;
  xhr1 = new XMLHttpRequest();
  var date;
  var href;    
  var pic;
  var title;

  url= url || 'data/data0.json';

  xhr1.open('GET',url,true);
  xhr1.onreadystatechange=function(e){
    if (xhr1.readyState===4) {
      if (xhr1.status===200) {
        var data_p=JSON.parse(xhr1.responseText);
        window.data_p=data_p;
        for (var i = 0; i < data_p.length; i++) {
          date=data_p[i].date;
          href=data_p[i].href;
          pic=data_p[i].pic;
          title=data_p[i].title;
          var li=document.createElement('li');
          li.setAttribute('class','');
          var a=document.createElement('a');
          a.setAttribute('href',href);
          var div1=document.createElement('div');
          div1.setAttribute('class','poster load');
          div1.innerHTML="<img src='"+pic+"'>";
          var div2=document.createElement('div');
          div2.setAttribute('class','description');
          div2.innerHTML="<h1><span class='date'>"+date+"</span><span class='title'>"+title+"</span></h1>";
          a.appendChild(div1);
          a.appendChild(div2);
          li.appendChild(a);
          ul[1].appendChild(li);
        }
      }
    }
  }
  xhr1.send(null);  
}
var menu=document.getElementsByClassName('menu-button')[0];
var about=document.getElementsByClassName('about')[0];
var close=document.getElementsByClassName('close')[0];
menu.onclick=function(){

  about.style.display="block";
}
close.onclick=function(){
  about.style.display="none";
}