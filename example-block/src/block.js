import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Styles
import './style.scss';

// Block name
const className = 'example-block';

// Register block
registerBlockType(`goit/${className}`, {
	title: __('Example Block', 'goit'),
	category: 'goit',
	icon: 'welcome-write-blog',
	attributes: {
		heading: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
	},

	// Edit function
	edit: ({ attributes, setAttributes }) => {
		const { heading } = attributes;

		return (
			<div className={className}>
				<RichText
					tagName="h3"
					placeholder={__('Your text here...', 'goit')}
					value={heading}
					onChange={(value) => setAttributes({ heading: value })}
				/>		
			</div>
		);
	},

	// Save function
	save: ({ attributes }) => {
		const { heading } = attributes;

		return (
			<div>
				<RichText.Content tagName="h3" value={heading} />				
			</div>
		);
	},
});