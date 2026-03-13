/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

class BlockCrashBoundary extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			hasError: false,
		};
	}

	componentDidCatch( error, errorInfo ) {
		this.setState( {
			hasError: true,
		} );

		const { blockName, clientId } = this.props;
		// eslint-disable-next-line no-console
		console.warn( '[BlockCrashBoundary] Block crashed:', {
			blockName,
			clientId,
			error: error?.message,
			stack: error?.stack,
			componentStack: errorInfo?.componentStack,
		} );
	}

	render() {
		if ( this.state.hasError ) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}

export default BlockCrashBoundary;
