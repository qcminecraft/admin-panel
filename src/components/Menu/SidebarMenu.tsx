import * as React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Sidebar, Menu, Icon, Progress } from "semantic-ui-react"
import { translate } from "react-i18next"
import { Dispatch } from "redux"

import { requestServlets, ServletsRequestAction, AppAction } from "../../actions"

import { checkPermissions, PermissionTree } from "../../components/Util"
import { ViewDefinition, ServerStat, AppState } from "../../types"

export interface Props extends reactI18Next.InjectedTranslateProps {
	// State
	cpu: ServerStat[],
	memory: ServerStat[],
	disk: ServerStat[],
	servlets: {},
	perms: PermissionTree,
	path: string

	// Own
	show: boolean
	views: ViewDefinition[]

	// Dispatch
	requestServlets: () => ServletsRequestAction
}

class SidebarMenu extends React.Component<Props> {

	constructor(props: Props) {
		super(props)

		this.renderMenuItem = this.renderMenuItem.bind(this)
	}

	componentDidMount() {
		this.props.requestServlets()
	}

	render() {
		const _t = this.props.t
		const views = this.props.views

		return (
			<Sidebar
				vertical
				as={Menu}
				animation="push"
				visible={this.props.show}
			>

				{this.props.cpu.length > 0 ?
					<Menu.Item name="load">
						<Progress
							percent={this.props.cpu[this.props.cpu.length - 1].value * 100}
							progress="percent"
							precision={1}
							label={_t("CPU")}
							color="blue"
							size="small"
						/>
						<Progress
							percent={this.props.memory[this.props.memory.length - 1].value * 100}
							progress="percent"
							precision={1}
							label={_t("Memory")}
							color="red"
							size="small"
						/>
						<Progress
							percent={this.props.disk[this.props.disk.length - 1].value * 100}
							progress="percent"
							precision={1}
							label={_t("Disk")}
							color="green"
							size="small"
						/>
					</Menu.Item>
				: null}

				{views.map(this.renderMenuItem)}
			</Sidebar>
		)
	}

	renderMenuItem(view: ViewDefinition): JSX.Element | null {
		if (view.perms && !checkPermissions(this.props.perms, view.perms)) {
			return null
		}

		if (!view.views) {
			return (
				<Menu.Item
					as={NavLink}
					key={view.path}
					to={view.path}
				>
					<Icon name={view.icon} /> {this.props.t(view.title)}
				</Menu.Item>
			)
		}

		return (
			<Menu.Item key={view.path}>
				<Menu.Header>{this.props.t(view.title)}</Menu.Header>
				<Menu.Menu>
					{view.views.map(this.renderMenuItem)}
				</Menu.Menu>
			</Menu.Item>
		)
	}
}

const mapStateToProps = (state: AppState) => {
	return {
		cpu: state.dashboard.cpu,
		memory: state.dashboard.memory,
		disk: state.dashboard.disk,
		servlets: state.api.servlets,
		perms: state.api.permissions,

		// We include the pathname so this component updates when the path changes
		path: state.router.location ? state.router.location.pathname : "",
	}
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
	return {
		requestServlets: () => dispatch(requestServlets()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(translate("Menu")(SidebarMenu))