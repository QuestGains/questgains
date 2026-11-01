// QuestGains — HTML escaping helpers (load before any other app script).
// Use escapeHTML() for ANY user/server-controlled string interpolated into innerHTML.
// For inline handler args use escapeJSString() inside an attribute, or better, addEventListener.
(function (g) {
  var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;', '=': '&#61;', '/': '&#47;' };
  function escapeHTML(v) {
    if (v === null || v === undefined) return '';
    return String(v).replace(/[&<>"'`=\/]/g, function (c) { return MAP[c]; });
  }
  // For a value placed inside a single-quoted JS string inside an HTML attribute,
  // e.g. onclick="fn('${escapeJSString(id)}')".
  function escapeJSString(v) {
    if (v === null || v === undefined) return '';
    var js = String(v).replace(/[\\'"\n\r\u2028\u2029<>&]/g, function (c) {
      return '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0');
    });
    return escapeHTML(js);
  }
  g.escapeHTML = escapeHTML;
  g.escapeJSString = escapeJSString;
  if (typeof module !== 'undefined' && module.exports) module.exports = { escapeHTML: escapeHTML, escapeJSString: escapeJSString };
})(typeof window !== 'undefined' ? window : globalThis);
