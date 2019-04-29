import React, { Component } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
export default class AccountsUIWrapper extends Component {
    state = {
        container: React.createRef(),
    }
  componentDidMount() {
      // Utiliser Meteor Blaze pour afficher les boutons de connexion
    this.view = Blaze.render(Template.loginButtons,
      this.state.container.current);
  }
  componentWillUnmount() {
     // Nettoyer la vue Blaze
    Blaze.remove(this.view);
  }
  render() {
    // Il suffit de rendre un conteneur d'espace réservé qui sera rempli
    return <span ref={ this.state.container } />;
  }
}