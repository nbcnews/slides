define(['hogan'], function(Hogan) {
  var t = {
    'hogantemplate' : new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"example\">");t.b("\n" + i);t.b("    <span class=\"stuff\">");t.b(t.v(t.f("stuff",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }}, undefined, undefined, {modelGet:true})
  },
  r = function(n) {
    var tn = t[n];
    return function(c, p, i) {
      return tn.render(c, p || t, i);
    };
  };
  return {
    'hogantemplate' : r('hogantemplate')
  };
});
