var onBegin = Ember.run.backburner.options.onBegin;
var onEnd = Ember.run.backburner.options.onEnd;
var runloopStartTimes = [];

Ember.run.backburner.options.onBegin = function() {
  runloopStartTimes.push(+new Date);
  onBegin.apply(this, arguments);
};
Ember.run.backburner.options.onEnd = function() {
  onEnd.apply(this, arguments);
  var startTime = runloopStartTimes.pop(),
      now = +new Date(),
      diff = now - startTime;

  if (diff < 2) { return; } // filter out runloops faster than 2ms

  console.log(Ember.VERSION + ' runloop: ' + diff.toFixed(2) + ', since start: ' + (now - START_TIME));
};

App = Ember.Application.create();

Ember.TEMPLATES.application = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  data.buffer.push("<h2 id='title'>Welcome to Ember.js</h2>");
});