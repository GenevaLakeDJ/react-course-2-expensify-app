'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            // now that we're reading from local storage, doesn't make sense to allow the user to pass in a property anymore
            // options: props.options
            options: []
        };
        return _this;
    }
    // only have access to lifecycle (below function) in class based components.  no way to manage lifecyle in stateless functional components


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                // edge case
                // need if block to make sure we don't set options to null if there are no options, rather we should use the default [] value previously set
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // Do nothing at all
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('componentWillUnmount!');
        }
        // props is one way - available to the children below but children cannot push to props
        // we set up functions here and push those to the children, so the function can modify props

    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // this.setState(() => {
            //     return {
            //         options: []
            //     }
            // })
            // below returns array
            // const num = () => []
            // below, is it an object or function body? it's function body, as it returns undefined
            // const num = () => {}
            // below returns empty object
            // const num = () => ({})
            this.setState(function () {
                return {
                    options: []
                };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            // console.log('hdo', option)
            this.setState(function (prevState) {
                return {
                    // filter returns new array, iterates and when it returns true, adds to new array
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'This option already exists';
            }
            // don't need another else since both statements above have return
            // this.setState((prevState) => {
            //     // we NEVER want to manipulate the prevState data, so prevState.options.push(option) is not a good idea
            //     return {
            //         options: prevState.options.concat([option])
            //     }
            // })
            this.setState(function (prevState) {
                return {
                    options: prevState.options.concat([option])
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            // const title = 'Indecision'
            var subtitle = 'Put your life in the hands of a computer';
            // below is passing the data down into the classes
            // if you need to go into a subclass, pass down to first class then via props to sub class
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);
// delete default props since we are using local storage now
// IndecisionApp.defaultProps = {
//     options: []
// }

var Header = function Header(props) {
    console.log(props);
    // below renders the default title if no title is passed in
    // below also renders the subtitle but only if it exists
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Indecision'

    // class Header extends React.Component {
    //     render() {
    //         console.log(this.props)
    //         return (
    //             <div>
    //                 <h1>{this.props.title}</h1>
    //                 <h2>{this.props.subtitle}</h2>
    //             </div>
    //         )
    //     }
    // }

};var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'What should I do?'
        )
    );
};

// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button 
//                     onClick={this.props.handlePick}
//                     disabled={!this.props.hasOptions}
//                 >
//                     What should I do?
//                 </button>
//             </div>
//         )
//     }
// }

var Options = function Options(props) {
    return (
        // handleDeleteOption below passes down (through) the handleDeleteOption from render to the Option sub class
        React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                { onClick: /*this.handleRemoveAll*/props.handleDeleteOptions },
                'Remove All'
            ),
            props.options.length === 0 && React.createElement(
                'p',
                null,
                'Please add an option to get started!'
            ),
            props.options.map(function (option) {
                return React.createElement(Option, {
                    key: option,
                    optionText: option,
                    handleDeleteOption: props.handleDeleteOption
                });
            })
        )
    );
};

// class Options extends React.Component {
//     // // constructor automatically has props passed in, props actually equals this.props used below
//     // constructor(props) {
//     //     // if we don't call super with the props, we don't have access to this.props
//     //     // it's the bare minimum to override the constructor function, it does not add any behavior
//     //     super(props)
//     //     // we are making sure that whenever we call handleRemoveAll, the context is correct
//     //     this.handleRemoveAll = this.handleRemoveAll.bind(this)
//     // }
//     // handleRemoveAll() {
//     //     alert('handleRemoveAll')
//     // }
//     render() {
//         return (
//             <div>
//                 <button onClick={/*this.handleRemoveAll*/this.props.handleDeleteOptions}>Remove All</button>
//                 {this.props.options.map((option) => <Option key={option} optionText={option}/>)}
//                 <Option />
//             </div>
//         )
//     }
// }

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                // onClick={props.handleDeleteOption}
                // below allows us to actually send the data back
                onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                }
            },
            'remove'
        )
    );
};

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.optionText}
//             </div>
//         )
//     }
// }

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }
    // leave this here (instead of moving it up to parent), best left specific to this part


    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            // using this inside of a handle function, so need constructor function
            var error = this.props.handleAddOption(option);
            // component state below
            // this.setState(() => {
            //     return { error }
            // })
            this.setState(function () {
                return { error: error };
            });

            // if no error, clear the input box
            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

// // props is the same as this.props in the class based components
// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     )
// }

// ReactDOM.render(<User name="Andrew" age={26}/>, document.getElementById('app'))

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
