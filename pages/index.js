import React from 'react'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import NoSSR from 'react-no-ssr'

export default class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  static async getInitialProps () {
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json()

    return { ...data }
  }

  render () {
    return (
      <div>
        <div>
          <input type='text' onChange={(e) => this.setState({ name: e.target.value })} />
          <Link href={`/?name=${this.state.name}`} as={`/${this.state.name}`}>
            <button> Say Hello </button>
          </Link>
        </div>

        {
          this.props.url.query.name
            ? <h1> {this.props.greeting || 'Hello'} {this.props.url.query.name}! </h1>
            : <br />
        }

        <NoSSR onSSR={<h1> Loading </h1>}>
          <ReactCSSTransitionGroup
            transitionName='example'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()].map((i) => (
                <h1 key={i}>{i}</h1>
              ))
            }
          </ReactCSSTransitionGroup>
        </NoSSR>

        <style jsx>{`
          .example-enter {
            opacity: 0.01;
          }

          .example-enter.example-enter-active {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }

          .example-leave {
            opacity: 1;
          }

          .example-leave.example-leave-active {
            opacity: 0.01;
            transition: opacity 300ms ease-in;
          }
        `}</style>
      </div>
    )
  }
}
