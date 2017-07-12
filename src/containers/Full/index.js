import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';

import Dashboard from '../../views/Dashboard'
import Chat from "../../views/Chat"
import Commands from "../../views/Commands"
import Map from "../../views/Map"
import Worlds from '../../views/Worlds'
import Players from '../../views/Players'
import Entities from '../../views/Entities'
import TileEntities from '../../views/TileEntities'
import Operations from '../../views/Operations'
import Plugins from '../../views/Plugins'
import Settings from '../../views/Settings'

class Full extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<div className="app-body">
					<Sidebar {...this.props}/>
					<main className="main">
						<Breadcrumb />
						<div className="container-fluid">
							<Switch>
								<Route path="/dashboard" name="Dashboard" component={Dashboard}/>
								<Route path="/chat" name="Chat" component={Chat}/>
								<Route path="/commands" name="Commands" component={Commands}/>
								<Route path="/map" name="Map" component={Map}/>
								<Route path="/worlds" name="Worlds" component={Worlds}/>
								<Route path="/players" name="Players" component={Players}/>
								<Route path="/entities" name="Entities" component={Entities}/>
								<Route path="/tile-entities" name="Tile Entities" component={TileEntities}/>
								<Route path="/operations" name="Block Operations" component={Operations}/>
								<Route path="/plugins" name="Plugins" component={Plugins}/>
								<Route path="/settings" name="Settings" component={Settings}/>
								
								<Redirect from="/" to="/dashboard"/>
							</Switch>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default Full;
