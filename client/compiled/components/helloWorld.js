"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class HelloWorld extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrue: true,
      message: "Hello World"
    };
  }
  componentDidMount() {
    console.log('this is a test');
    if (this.state.isTrue) {
      console.log('this is another test');
      _axios.default.get('/goodbye').then(response => {
        this.setState({
          message: response.data
        }, () => {
          console.log(this.state.message);
        });
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, this.state.message);
  }
}
var _default = HelloWorld;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIZWxsb1dvcmxkIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiaXNUcnVlIiwibWVzc2FnZSIsImNvbXBvbmVudERpZE1vdW50IiwiY29uc29sZSIsImxvZyIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwic2V0U3RhdGUiLCJkYXRhIiwiY2F0Y2giLCJlcnJvciIsInJlbmRlciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2hlbGxvV29ybGQuanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jbGFzcyBIZWxsb1dvcmxkIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNUcnVlOiB0cnVlLFxuICAgICAgbWVzc2FnZTogXCJIZWxsbyBXb3JsZFwiXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc29sZS5sb2coJ3RoaXMgaXMgYSB0ZXN0Jyk7XG4gICAgaWYgKHRoaXMuc3RhdGUuaXNUcnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyBhbm90aGVyIHRlc3QnKTtcbiAgICAgIGF4aW9zLmdldCgnL2dvb2RieWUnKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhXG4gICAgICAgIH0sICgpID0+IHsgY29uc29sZS5sb2codGhpcy5zdGF0ZS5tZXNzYWdlKSB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj57dGhpcy5zdGF0ZS5tZXNzYWdlfTwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWxsb1dvcmxkOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUEwQjtBQUFBO0FBQUE7QUFFMUIsTUFBTUEsVUFBVSxTQUFTQyxnQkFBUyxDQUFDO0VBRWpDQyxXQUFXLENBQUNDLEtBQUssRUFBRTtJQUNqQixLQUFLLENBQUNBLEtBQUssQ0FBQztJQUNaLElBQUksQ0FBQ0MsS0FBSyxHQUFHO01BQ1hDLE1BQU0sRUFBRSxJQUFJO01BQ1pDLE9BQU8sRUFBRTtJQUNYLENBQUM7RUFDSDtFQUVBQyxpQkFBaUIsR0FBRztJQUNsQkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7SUFDN0IsSUFBSSxJQUFJLENBQUNMLEtBQUssQ0FBQ0MsTUFBTSxFQUFFO01BQ3JCRyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztNQUNuQ0MsY0FBSyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQ3BCQyxJQUFJLENBQUNDLFFBQVEsSUFBSTtRQUNoQixJQUFJLENBQUNDLFFBQVEsQ0FBQztVQUNaUixPQUFPLEVBQUVPLFFBQVEsQ0FBQ0U7UUFDcEIsQ0FBQyxFQUFFLE1BQU07VUFBRVAsT0FBTyxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDTCxLQUFLLENBQUNFLE9BQU8sQ0FBQztRQUFDLENBQUMsQ0FBQztNQUMvQyxDQUFDLENBQUMsQ0FDRFUsS0FBSyxDQUFDLFVBQVVDLEtBQUssRUFBRTtRQUN0QlQsT0FBTyxDQUFDUyxLQUFLLENBQUNBLEtBQUssQ0FBQztNQUN0QixDQUFDLENBQUM7SUFDSjtFQUNGO0VBRUFDLE1BQU0sR0FBRztJQUNQLG9CQUNFLDBDQUFNLElBQUksQ0FBQ2QsS0FBSyxDQUFDRSxPQUFPLENBQU87RUFFbkM7QUFDRjtBQUFDLGVBRWNOLFVBQVU7QUFBQSJ9