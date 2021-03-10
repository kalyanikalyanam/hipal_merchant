import React from "react";
import Loader from "react-loader-spinner";

class LoaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Loader type="Bars" color="#fd9136" height="50" width="50" />;
  }
}

export default LoaderPage;
