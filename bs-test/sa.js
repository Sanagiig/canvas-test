(function (global, fac) {
  typeof exports === 'object' && typeof module !== 'undefined' ? fac(exports, require('jquery')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
      (fac((global.bootstrap = {}), global.jQuery));

})(this, function (exports, $) {

  var Unit = {
    inherit: function (sup, sub) {
      var F = function () {};
      F.prototype = sup.prototype;
      sub.prototype = new F();
    },

    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $$$1(document).find(selector);
        return $selector.length > 0 ? selector : null;
      } catch (err) {
        return null;
      }
    },



    destroy: function (element) {
      $(element).remove();
    },
  };

  var Component = function ($$$1) {
    var component = function (element) {
      this.ClassName = {};
      this._element = element;
    }

    var _proto = component.prototype;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.MAIN(element);
      var parent = false;

      if (selector) {
        parent = $$$1(selector)[0];
      }

      if (!parent) {
        parent = $$$1(element).closest("." + this.className.MAIN)[0];
      }

      return parent;
    };

    return component;
  }($)

  var Alert = function ($$$1) {
    var NAME = 'alert';
    var KEY = 'sa.alert';
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: KEY + ".close",
      CLOSED: KEY + ".closed",
      CLICK_DATA_API: "click" + KEY
    };


    var alert = function () {
      var alert = function (element) {
        this._element = element;
        this.className = {
          MAIN: 'alert',
          FADE: 'fade',
          SHOW: 'show'
        };
      }

      var _proto = alert.prototype;
      Unit.inherit(Component,alert);

      _proto.close = function (element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

          console.log('close')
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }


        this._removeElement(rootElement);
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(this.ClassName.SHOW);

        if (!$$$1(element).hasClass(this.ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          console.log('dis')
          console.log(this);
          alertInstance.close(this);
        };
      };


      return alert;
    }();


    $$$1(document).on(Event.CLOSE, Selector.DISMISS, alert._handleDismiss(new alert()));
    $$$1.fn[NAME] = alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return alert._jQueryInterface;
    };

    return alert;
  }($);
})