webpackJsonp([1],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slide__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slide___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Slide__);



/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__Slide___default.a],
  props: {
    url: { default: 'https://i.imgur.com/P7iyH.png' },
    enter: { default: null },
    leave: { default: null }
  },
  computed: {
    style: function style() {
      return {
        'background-image': 'url(' + this.url + ')',
        'background-position': 'center center',
        'background-size': 'cover'
      };
    }
  }
});

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    skip: { default: false },
    enter: { default: null },
    leave: { default: null },
    steps: { default: 1 },
    mouseNavigation: { default: true },
    keyboardNavigation: { default: true }
  },
  data: function data() {
    return {
      step: 1,
      active: false,
      isSlide: true,
      slideTimer: 0
    };
  },
  mounted: function mounted() {
    var self = this;
  },
  methods: {
    nextStep: function nextStep() {
      if (this.step === this.steps) {
        this.$parent.nextSlide();
      } else {
        this.step++;
      }
    },
    previousStep: function previousStep() {
      if (this.step === 1) {
        this.$parent.previousSlide();
      } else {
        this.step--;
      }
    }
  },
  watch: {
    step: function step(val) {
      this.$parent.step = val;
    },
    active: function active(val) {
      var self = this;
      if (val) {
        this.slideTimer = 0;
        this.timerUpdater = setInterval(function () {
          self.slideTimer++;
        }, 1000);
      } else {
        clearInterval(this.timerUpdater);
      }
    }
  }
});

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    firstSlide: { default: 1 },
    startStep: { default: 1 },
    lastSlide: { default: null },
    embedded: { default: false },
    inserted: { default: false },
    keyboardNavigation: { default: true },
    mouseNavigation: { default: true },
    onStartExit: { default: function _default() {
        return function () {
          this.$router.push('/');
        };
      } },
    onEndExit: { default: function _default() {
        return function () {
          this.$router.push('/');
        };
      } },
    skip: { default: false }
  },
  data: function data() {
    return {
      currentSlideIndex: 1,
      currentSlide: null,
      step: this.startStep,
      slideshowTimer: 0,
      slideTimer: 0,
      slides: [],
      active: true
    };
  },
  computed: {
    fullPageStyle: function fullPageStyle() {
      var size = 0.04 * Math.min(this.fullPageWidth, this.fullPageHeight);
      return { fontSize: size + 'px' };
    },
    embeddedStyle: function embeddedStyle() {
      var size = 0.04 * Math.min(this.parentWidth, this.parentHeight);
      return { fontSize: size + 'px' };
    },
    active: function active() {
      return this.slides.some(function (slide) {
        return slide.active;
      });
    }
  },
  mounted: function mounted() {
    this.isSlideshow = true;
    var self = this;
    this.findSlides();

    if (!this.inserted) {
      this.currentSlide = this.slides[this.currentSlideIndex - 1];
      this.currentSlide.step = this.startStep;


      if (this.keyboardNavigation) {
        window.addEventListener('keydown', this.keydown);
      }
      if (this.mouseNavigation) {
        window.addEventListener('click', this.click);
        window.addEventListener('wheel', this.wheel);
      }
      if (this.embedded) {
        this.$el.className += ' embedded-slideshow';
      }
    }
    window.addEventListener('resize', this.handleResize);

    if (this.preloadedImages) {
      setTimeout(function () {
        for (var image in self.preloadedImages) {
          new Image().src = self.preloadedImages[image];
        }
      }, 1000);
    }

    this.handleResize();
    this.timerUpdater = setInterval(function () {
      self.slideshowTimer++;
      self.slideTimer++;
    }, 1000);
    this.afterMounted();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('click', this.click);
    window.removeEventListener('wheel', this.wheel);
    clearInterval(this.slideshowTimerUpdater);
  },
  methods: {
    nextStep: function nextStep() {
      if (this.step === this.currentSlide.steps) {
        this.nextSlide();
      } else {
        this.step++;
      }
    },
    previousStep: function previousStep() {
      if (this.step === 1) {
        this.previousSlide();
      } else {
        this.step--;
      }
    },
    nextSlide: function nextSlide() {
      var nextSlideIndex = this.currentSlideIndex + 1;
      while (nextSlideIndex < this.slides.length + 1 && (this.slides[nextSlideIndex - 1].skip || this.slides[nextSlideIndex - 1].$parent.skip)) {
        nextSlideIndex++;
      }
      if (nextSlideIndex < this.slides.length + 1) {
        this.currentSlideIndex = nextSlideIndex;
      } else if (!this.embedded) {
        this.onEndExit();
      }
    },
    previousSlide: function previousSlide() {
      var previousSlideIndex = this.currentSlideIndex - 1;
      while (previousSlideIndex >= 1 && (this.slides[previousSlideIndex - 1].skip || this.slides[previousSlideIndex - 1].$parent.skip)) {
        previousSlideIndex--;
      }
      if (previousSlideIndex >= 1) {
        this.currentSlideIndex = previousSlideIndex;
      } else if (!this.embedded) {
        this.onStartExit();
      }
    },
    handleResize: function handleResize(event) {
      var width = 0;
      var height = 0;
      if (this.embedded) {
        width = this.$el.parentElement.clientWidth;
        height = this.$el.parentElement.clientHeight;
      } else {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      }
      this.$el.style.fontSize = 0.04 * Math.min(height, width) + 'px';
    },
    click: function click(evt) {
      if (this.mouseNavigation && this.currentSlide.mouseNavigation) {

        if (evt.clientX < 0.1 * document.documentElement.clientWidth) {
          evt.preventDefault();
          this.previousStep();
        } else if (evt.clientX > 0.9 * document.documentElement.clientWidth) {
          evt.preventDefault();
          this.nextStep();
        }
      }
    },
    wheel: function wheel(evt) {
      if (this.mouseNavigation && this.currentSlide.mouseNavigation) {
        evt.preventDefault();
        if (evt.wheelDeltaY > 0 || evt.deltaY > 0) {
          this.nextStep();
        } else if (evt.wheelDeltaY < 0 || evt.deltaY < 0) {
          this.previousStep();
        }
      }
    },
    keydown: function keydown(evt) {
      if (this.keyboardNavigation && (this.currentSlide.keyboardNavigation || evt.ctrlKey)) {
        evt.preventDefault();
        if (evt.key === 'ArrowLeft') {
          this.previousStep();
        } else if (evt.key === 'ArrowRight') {
          this.nextStep();
        }
      }
    },
    afterMounted: function afterMounted(evt) {
      return;
    },
    findSlides: function findSlides() {
      var self = this;
      var i = 0;
      this.$children.forEach(function (el) {
        if (el.isSlide) {
          i++;
          if (i >= self.firstSlide && (!self.lastSlide || i <= self.lastSlide)) {
            self.slides.push(el);
          }
        } else if (el.isSlideshow) {
          el.active = false;
          el.slides.forEach(function (slide) {
            i++;
            slide.active = false;
            if (i >= self.firstSlide && (!self.lastSlide || i <= self.lastSlide)) {
              self.slides.push(slide);
            }
          });
        }
      });
    }
  },
  watch: {
    currentSlide: function currentSlide(newSlide, oldSlide) {

      if (oldSlide) {
        oldSlide.active = false;
        if (oldSlide.$parent !== newSlide.$parent && oldSlide.$parent !== this) {
          oldSlide.$parent.active = false;
        }
      }
      this.slideTimer = 0;
      this.step = 1;
      newSlide.step = 1;
      newSlide.$parent.step = 1;
      newSlide.active = true;
      newSlide.$parent.active = true;
    },
    currentSlideIndex: function currentSlideIndex(index) {
      this.currentSlide = this.slides[index - 1];
    },
    step: function step(val) {
      if (this.currentSlide) {
        this.currentSlide.step = val;
        this.currentSlide.$parent.step = val;
      }
    },
    active: function active(val) {
      if (val) {
        this.$el.style.visibility = 'visible';
      } else {
        this.$el.style.visibility = 'hidden';
      }
    }
  }

});

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highlight_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highlight_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highlight_js__);



function randId() {
  return Math.random().toString(36).substr(2, 10);
}
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: { default: function _default() {
        return randId();
      } },
    id2: { default: function _default() {
        return randId();
      } },
    id3: { default: function _default() {
        return randId();
      } },
    lang: { default: null }
  },
  mounted: function mounted() {
    this.update();
  },
  methods: {
    update: function update() {
      var codeBlock = document.getElementById(this.id);
      var commentsContent = document.getElementById(this.id2);
      var codeContent = document.getElementById(this.id3);
      codeContent.innerHTML = commentsContent.innerHTML;
      console.log(this.id);
      if (this.lang) {
        __WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.highlightBlock(codeBlock);
      }
    }
  }
});

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    enter: { default: null },
    leave: { default: null },
    active: { default: true },
    arrow: { default: true }
  }
});

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: { default: null },
    label: { default: null },
    fontsize: { default: '0.7em' }
  },
  methods: {
    select: function select() {
      this.$emit('input', this.label);
      console.log(this.label, this.value, this.value === this.label);
    }
  }
});

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: { default: true },
    fontsize: { default: '0.8em' }
  },
  data: function data() {
    return {
      checked: this.value
    };
  },
  methods: {
    toggle: function toggle() {
      console.log(this.checked);
      this.checked = !this.checked;
    }
  },
  watch: {
    checked: function checked(val) {
      this.$emit('input', val);
    }
  }
});

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    enter: { default: 'slideInLeft' },
    leave: { default: 'slideOutLeft' },
    trigger: { default: false },
    position: { default: 'left top' },
    duration: { default: 3 }
  },
  data: function data() {
    return {
      active: false,
      timeout: null,
      style: {
        top: this.position.indexOf('top') >= 0 ? '0%' : 'none',
        bottom: this.position.indexOf('bottom') >= 0 ? '0%' : 'none',
        left: this.position.indexOf('left') >= 0 ? '0%' : 'none',
        right: this.position.indexOf('right') >= 0 ? '0%' : 'none'
      }
    };
  },
  watch: {
    trigger: function trigger(val, oldVal) {
      if (!oldVal && val) {
        this.active = true;
        var self = this;
        this.timeout = setTimeout(function () {
          self.active = false;
        }, 1000 * this.duration);
      } else if (oldVal && !val) {
        this.active = false;
        clearTimeout(this.timeout);
      }
    }
  }
});

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_slideshows_slideshows__ = __webpack_require__(2);




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      slideshows: __WEBPACK_IMPORTED_MODULE_0_slideshows_slideshows__["a" /* default */].list
    };
  },
  mounted: function mounted() {
    console.log(this.slideshows);
    document.currentSlide = {};
  },
  methods: {
    click: function click(evt) {
      evt.stopPropagation();
    }
  }
});

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  list: [__webpack_require__(211), __webpack_require__(210)]
});

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eagle_js__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0_eagle_js__["a" /* default */].slideshow],
  infos: {
    title: 'Présentation Soutenance',
    description: 'Support pour ma présentation orale',
    path: 'diapo-soutenance'
  }
});

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(218),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(212),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(13),
  /* template */
  __webpack_require__(219),
  /* scopeId */
  "data-v-3e727f58",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(22)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(214),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(28)

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(222),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(24)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(217),
  /* scopeId */
  "data-v-3678a545",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(29)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(223),
  /* scopeId */
  "data-v-71c18dcc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(216),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_eagle_js__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0_eagle_js__["a" /* default */].slideshow],
  data: function data() {
    return {
      welcome: 'Bienvenue'
    };
  },

  infos: {
    title: 'Your First Slideshow',
    description: 'A boilerplate to get you started',
    path: 'your-first-slideshow'
  }
});

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(224),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(220),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 212:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('eg-transition', {
    attrs: {
      "enter": _vm.enter,
      "leave": _vm.leave
    }
  }, [(_vm.active) ? _c('div', {
    staticClass: "eg-slide image-slide",
    style: (_vm.style)
  }) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('eg-transition', {
    attrs: {
      "enter": _vm.enter,
      "leave": _vm.leave
    }
  }, [(_vm.active) ? _c('div', {
    staticClass: "eg-slide"
  }, [_c('div', {
    staticClass: "eg-slide-content"
  }, [_vm._t("default")], 2)]) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('eg-transition', {
    attrs: {
      "enter": _vm.enter,
      "leave": _vm.leave
    }
  }, [(_vm.active) ? _c('div', {
    staticClass: "eg-code-comment"
  }, [(_vm.arrow) ? _c('span', [_vm._v("←")]) : _vm._e(), _vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "frontpage"
  }, [_c('div', {
    staticClass: "content"
  }, [_vm._m(0), _c('h2', [_vm._v("A slideshow framework for hackers")]), _c('p', [_vm._v("Eagle.js is a web-based slideshow framework for Vue.js.\nIt supports animations, themes, interactive widgets (for web demos),\nand makes it easy to reuse components, slides and styles across presentations.\n")]), _c('p', [_vm._v("Most of all, Eagle aims at offering a simple and very hackable API so you\ncan get off the beaten tracks and craft the slideshows you really want.\n\n")]), _c('div', {
    staticClass: "thumbnails"
  }, _vm._l((_vm.slideshows), function(slideshow) {
    return _c('div', {
      staticClass: "box-card"
    }, [_c('router-link', {
      attrs: {
        "to": slideshow.infos.path
      },
      nativeOn: {
        "click": function($event) {
          _vm.click($event)
        }
      }
    }, [_c('div', {
      staticClass: "embedded-slideshow-container"
    }, [_c(slideshow, {
      tag: "component",
      attrs: {
        "embedded": true,
        "keyboardNavigation": false,
        "mouseNavigation": false
      }
    })], 1)]), _c('div', {
      staticClass: "caption"
    }, [_c('h3', [_vm._v(_vm._s(slideshow.infos.title))]), _c('p', {
      staticClass: "thumbnail-description"
    }, [_vm._v(_vm._s(slideshow.infos.description))])])], 1)
  }))])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h1', [_c('span', {
    staticClass: "logo"
  }), _c('span', [_vm._v("Eagle")]), _c('span', {
    staticClass: "grey"
  }, [_vm._v(".js")])])
}]}

/***/ }),

/***/ 216:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('eg-transition', {
    attrs: {
      "enter": _vm.enter,
      "leave": _vm.leave
    }
  }, [(_vm.active) ? _c('div', {
    staticClass: "eg-triggered-message",
    style: (_vm.style)
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eg-radio"
  }, [_c('div', {
    staticClass: "radiobutton",
    style: ({
      'font-size': _vm.fontsize
    }),
    on: {
      "click": _vm.select
    }
  }, [_c('div', {
    staticClass: "radio"
  }), _c('div', {
    staticClass: "radiodot",
    class: {
      checked: _vm.value === _vm.label
    }
  })]), _vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "enter-active-class": _vm.enter ? 'animated ' + _vm.enter : '',
      "leave-active-class": _vm.leave ? 'animated ' + _vm.leave : ''
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 219:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eg-code-block container"
  }, [_c('div', {
    staticClass: "box hljs code-box",
    attrs: {
      "id": _vm.id
    }
  }, [_c('pre', [_c('code', {
    class: _vm.lang ? _vm.lang : '',
    attrs: {
      "id": _vm.id3
    }
  })])]), _c('div', {
    staticClass: "box comments-box"
  }, [_c('pre', [_c('code', {
    attrs: {
      "id": _vm.id2
    }
  }, [_vm._t("default")], 2)])])])
},staticRenderFns: []}

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 220:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "MyFirstSlideshow"
    }
  }, [_c('div', {
    staticClass: "eg-slideshow"
  }, [_c('slide', [_c('h1', [_vm._v("Faciliter la gestion d'une équipe dans le domaine du web")]), _c('h4', [_vm._v("This is your first slideshow !")])]), _c('slide', {
    attrs: {
      "enter": "bounceInRight",
      "leave": "fadeOut"
    }
  }, [_c('h3', [_vm._v("Hey modify me !")]), _c('p', [_vm._v("Come on modify me ! If you are running the development server,\nyou will see the changes take effect immediaely\n")])]), _c('slide', {
    attrs: {
      "enter": "fadeIn"
    }
  }, [_c('h3', [_vm._v("Want cool effects?")]), _c('p', [_vm._v("Code your own, or try stealing for the other slideshows !")])])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 221:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 222:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eg-modal"
  }, [_c('div', {
    staticClass: "content"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "eg-switch"
  }, [_c('div', {
    staticClass: "switch",
    style: ({
      'font-size': _vm.fontsize
    }),
    on: {
      "click": _vm.toggle
    }
  }, [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.checked
    }
  }), _c('div', {
    staticClass: "slider",
    class: {
      checked: _vm.checked
    }
  }), _c('div', {
    staticClass: "sliderdot",
    class: {
      checked: _vm.checked
    }
  })]), _c('span', {
    class: {
      unchecked: !_vm.checked
    }
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n  test\n")])
},staticRenderFns: []}

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(213),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(221),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(215),
  /* scopeId */
  "data-v-21c9f519",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Home__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_eagle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__slideshows_slideshows_js__ = __webpack_require__(2);











__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_eagle_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

var routes = [];
__WEBPACK_IMPORTED_MODULE_5__slideshows_slideshows_js__["a" /* default */].list.forEach(function (slideshow) {
  routes.push({
    path: '/' + slideshow.infos.path,
    component: slideshow
  });
});
routes.push({ path: '*', component: __WEBPACK_IMPORTED_MODULE_3__Home___default.a });

routes.push({
  path: '/',
  name: 'Home',
  component: __WEBPACK_IMPORTED_MODULE_3__Home___default.a
});
console.log(routes);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: routes
});

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_2__App___default.a }
});

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    enter: { default: null },
    leave: { default: null }
  }
});

/***/ })

},[8]);