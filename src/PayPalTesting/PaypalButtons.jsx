import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

// sb-mzazm4038104@personal.example.com
// VOD+pod8

 const CLIENT = {
   sandbox:
     "AVyOn7XBst8PtrWGOVeUvYXF-X0FSc6JDJ3g_gXyRdigDEYM-VXoOGCmR8f9gWJd_T-nf38s4BVFAelh",
   production:
     "your_production_key"
 };

 const CLIENT_ID = CLIENT.sandbox //process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;

class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {

    return actions.order.create({
      purchase_units: [{
        amount: {
            value: `${this.props.orderTotal}`,
            currency_code: 'GBP',
            breakdown: {
                item_total: {value: `${this.props.orderTotal}`, currency_code: 'GBP'}
            }
        },
        invoice_id: 'disrupters_invoice_id',
        items: this.props.basket
    }]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;

    return (
      <div className="main">
        {loading && 'Loading...'}

        {showButtons && (
          <div>

            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <div>
            <h3>
              Thank you for your order. You will receive email confirmation shortly.
            </h3>
          </div>
        )}
      </div>
    );
  }
}


 export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=GBP`)(PaypalButton);
