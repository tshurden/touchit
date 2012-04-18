(function (window, document, undefined) {
  
  var Touchit = function Touchit(els, o) {
    // els
    this.els = els;
    
    // options
    this.opts = o;
    
    // dom vendor prefixes
    this.dom_prefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
    
    // init
    this.init();
  },
  
  proto = Touchit.prototype = {
    
    // init
    init: function() {
      
      // set styles
      this.set_styles();
      
      // setup event listeners
      this.add_event_listeners();
      
    },
    
    set_styles: function() {
      
      // loop elements
      for (var i = this.els.length - 1; i >= 0; i--) {
        
        // if computed style is set to inline - set it to be inline-block
        if (window.getComputedStyle(this.els[i], null).getPropertyValue('display') == 'inline')
          this.els[i].style.display = 'inline-block';
        
        // loop all dom prefixes
        for (var j = this.dom_prefixes.length - 1; j >= 0; j--) {
          // set vendor specific transition styles
          this.els[i].style[this.dom_prefixes[j]+'Transition'] = '-'+this.dom_prefixes[j].toLowerCase()+'-transform 0.2s ease-in';
        }
        
        // set transform without vendor prefix
        this.els[i].style.transition = 'transform 0.2s ease-in';
        
      }
      
    },
    
    // setup event listeners
    add_event_listeners: function() {
      
      var self = this;
      
      // loop elements
      for (var i = this.els.length - 1; i >= 0; i--) {
        
        // setup event listener for each element
        this.els[i].addEventListener('touchstart', function() {
          
          // scale
          self.scale(this, self.opts.scale);
          
        }, false);
        
        // setup event listener for each element
        this.els[i].addEventListener('touchend', function() {
          
          // scale
          self.scale(this, 1);
          
        }, false);
        
      }
      
    },
    
    scale: function(el, val) {
      
      // loop all dom prefixes
      for (var i = this.dom_prefixes.length - 1; i >= 0; i--) {
        // set vendor specific transform styles
        el.style[this.dom_prefixes[i]+'Transform'] = 'scale('+val+')';
      }
      
      // set transform without vendor prefix
      el.style.transform = 'scale('+val+')';
      
    }
    
  };
  
  // expose touchit to window
  window.Touchit = Touchit;
  
})(window, document);