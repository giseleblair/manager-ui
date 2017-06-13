import React, { Component } from 'react'
import cx from 'classnames'
import styles from './styles.less'

import {toggleAccountsMenu} from '../../store/accounts-menu'
import {subMenuLoad} from '../../store/global-sub-menu'

export default class GlobalAccount extends Component {
  constructor(props) {
    super(props)
    this.showAccountsMenu = this.showAccountsMenu.bind(this)
    this.hideAccountsMenu = this.hideAccountsMenu.bind(this)
  }
  render() {
    return (
      <div
        className={styles.GlobalAccount}
        onMouseEnter={this.showAccountsMenu}
        onMouseLeave={this.hideAccountsMenu}>
        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
      </div>
    )
  }
  showAccountsMenu() {
    this.props.dispatch(subMenuLoad(''))
    this.props.dispatch(toggleAccountsMenu(true))
  }
  hideAccountsMenu() {
    this.props.dispatch(toggleAccountsMenu(false))
  }
}
