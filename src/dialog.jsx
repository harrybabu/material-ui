var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node
  },

  getStyles: function() {
    var gutter = Spacing.desktopGutter + 'px ';
    var styles = {
      title: {
        padding: gutter + gutter + '0 ' + gutter,
        color: this.context.theme.palette.textColor
      },
      content: {
        padding: Spacing.desktopGutter
      }
    };
    return styles;
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;

    var styles = this.getStyles();

    var title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 style={styles.title}>{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <DialogWindow
        {...other}
        ref="dialogWindow"
        className={className}
        style={this.props.style}>

        {title}

        <div ref="dialogContent" style={styles.content}>
          {this.props.children}
        </div>

      </DialogWindow>
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  }

});

module.exports = Dialog;
