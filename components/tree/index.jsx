/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tree Component (PROTOTYPE)

// THIS IS A PROTOTYPE and does NOT meet accessibility standards. It implements the [Tree design pattern](https://www.lightningdesignsystem.com/components/trees/) in React.

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// Child components
import Branch from './private/branch';

// ### classNames
import classNames from 'classnames';

// Similar to React's PropTypes check. When in development mode, it issues errors in the console about properties.
import checkProps from './check-props';

// ## Constants
import { TREE } from '../../utilities/constants';

/**
 * A tree is visualization of a structure hierarchy. A branch can be expanded or collapsed. This is a controlled component, since visual state is present in the `nodes` data.
 */
const Tree = (props) => {
	// TODO: This may need to be cleaned up to alert a developer when they do both that the heading is hidden.
	checkProps(TREE, props);

	const {
		assistiveText,
		className,
		heading,
		id,
		listClassName,
		nodes,
		onClick,
		onExpandClick,
		onScroll,
		searchTerm,
		listStyle
	} = props;

	// One of these is required to pass accessibility tests
	const headingText = assistiveText || heading;

	// Start the zero level branch--that is the tree root. There is no label for
	// the tree root, but is required by all other nodes
	return (
		<div id={id} className={classNames('slds-tree_container', className)} /* role="application" */>
			<h4
				className={classNames('slds-text-title--caps', { 'slds-assistive-text': assistiveText })}
				id={`${id}__heading`}
			>{headingText}</h4>
			<Branch
				getNodes={props.getNodes}
				initalClassName={listClassName}
				htmlId={id}
				initialStyle={listStyle}
				level={0}
				node={{ nodes }}
				onClick={onClick}
				onExpandClick={onExpandClick}
				onScroll={onScroll}
				searchTerm={searchTerm}
				treeId={id}
			/>
		</div>
	);
};

Tree.defaultProps = {
	getNodes: (node) => node.nodes
};

// ### Display Name
// Always use the canonical component name as the React display name.
Tree.displayName = TREE;

// ### Prop Types
Tree.propTypes = {
	/**
	 * For users of assistive technology, if set the heading will be hidden. One of `heading` or `assistiveText` must be set in order to label the tree.
	 */
	assistiveText: PropTypes.string,
	/**
	 * Class names to be added to the container element which has the heading and the `ul.slds-tree` element as children.
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	/**
	 * Class names to be added to the top-level `ul` element of the tree.
	 */
	listClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string]),
	/**
	 * A function that will be called by every branch to receive its child nodes. The parent `node` object with the branch data is passed into this function: `getNodes(node)`. If your state engine is Flux or Redux, then your tree data structure will probably be flattened or normalized within the store. This will allow you to build out your tree without transversing an actual tree of data and may be more performant.
	 */
	getNodes: PropTypes.func,
	/**
	 * This is the tree's heading and describes its contents. It can be hidden, see `assistiveText`.
	 * */
	heading: React.PropTypes.string,
	/**
	 * HTML `id` of primary element that has `.slds-tree` on it. This component has a wrapping container element outside of `.slds-tree`.
	 */
	id: PropTypes.string.isRequired,
	/**
	 * Array of items starting at the top of the tree. The required shape is: `{expanded: string, id: string, label: string, selected: string, type: string, nodes: array}`, but only `id` and `label` are required. Use `type: 'branch'` for folder and categories.
	 */
	nodes: PropTypes.array,
	/**
	 * Function that will run whenever an item or branch is clicked.
	 */
	onClick: PropTypes.func.isRequired,
	/**
	 * This function triggers when the expand or collapse icon is clicked.
	 */
	onExpandClick: PropTypes.func.isRequired,
	/**
	 * This function triggers when the top-level `ul` element scrolls. This can be used to implement an "infinite scroll" pattern and update the `nodes` prop accordingly.
	 */
	onScroll: PropTypes.func,
	/**
	 * Highlights term if found in node label. This does not auto-expand branches.
	 */
	searchTerm: PropTypes.string,
	/*
	 * Styles to be added to the top-level `ul` element. Useful for `overflow:hidden`.
	 */
	listStyle: PropTypes.object
};

module.exports = Tree;
