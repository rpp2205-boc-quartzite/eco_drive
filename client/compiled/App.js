"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _helloWorld = _interopRequireDefault(require("./components/helloWorld.jsx"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function App() {
  var testDB = () => {
    _axios.default.post('database').then(res => console.log(res)).catch(err => console.log(err));
  };
  testDB();
  return /*#__PURE__*/_react.default.createElement(_helloWorld.default, null);
}
var _default = App;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBcHAiLCJ0ZXN0REIiLCJheGlvcyIsInBvc3QiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwiZXJyIl0sInNvdXJjZXMiOlsiLi4vc3JjL0FwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vY29tcG9uZW50cy9oZWxsb1dvcmxkLmpzeCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG5cbiAgdmFyIHRlc3REQiA9ICgpID0+IHtcbiAgICBheGlvcy5wb3N0KCdkYXRhYmFzZScpXG4gICAgICAudGhlbigocmVzKSA9PiBjb25zb2xlLmxvZyhyZXMpKVxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXG4gIH1cblxuICB0ZXN0REIoKTtcblxuICByZXR1cm4gKFxuICAgIDxIZWxsb1dvcmxkIC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFBMEI7QUFFMUIsU0FBU0EsR0FBRyxHQUFHO0VBRWIsSUFBSUMsTUFBTSxHQUFHLE1BQU07SUFDakJDLGNBQUssQ0FBQ0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUNuQkMsSUFBSSxDQUFFQyxHQUFHLElBQUtDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixHQUFHLENBQUMsQ0FBQyxDQUMvQkcsS0FBSyxDQUFFQyxHQUFHLElBQUtILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRSxHQUFHLENBQUMsQ0FBQztFQUNyQyxDQUFDO0VBRURSLE1BQU0sRUFBRTtFQUVSLG9CQUNFLDZCQUFDLG1CQUFVLE9BQUc7QUFFbEI7QUFBQyxlQUVjRCxHQUFHO0FBQUEifQ==