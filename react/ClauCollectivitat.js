import React, { Component } from 'react'
import { Input } from 'vtex.styleguide'

class ClauCollectivitat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      claucollectivitat: '',
      error: null,
    }
  }

  componentDidMount() {
    this.props.registerValidator(this.validate)
    this.props.registerSubmitter(this.submit)
  }

  onChange = e => {
    this.setState({ claucollectivitat: e.target.value })
  }

  validate = () => {

  }

  submit = () => {
  }

  render(intl) {
    const { error, claucollectivitat } = this.state
    return (
      <div className="mb8">
        <Input
          name="claucollectivitat"
          label="Clau Collectivitat"
          value={claucollectivitat}
          errorMessage={error}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default ClauCollectivitat
