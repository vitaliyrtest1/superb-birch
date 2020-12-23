import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import Announcement from './Announcement';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        let style = _.get(this.props, 'data.config.style', null) || 'classic';
        let font = _.get(this.props, 'data.config.base_font', null) || 'sans-serif';
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'page.frontmatter.title', null) && (_.get(this.props, 'page.frontmatter.title', null) + ' | ')}{_.get(this.props, 'data.config.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={_.get(this.props, 'page.frontmatter.excerpt', null) || _.get(this.props, 'data.config.description', null)}/>
                    {(style === 'bold') ? (
                      (font === 'serif') ? (
                      <link href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/> 
                      ) : 
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    ) : ((style === 'classic') ? (
                      (font === 'serif') ? (
                      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                      ) : 
                      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    ) : 
                    	(font === 'serif') ? (
                    	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    	) : 
                    	<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
                    )}
                    <body className={'layout-' + _.get(this.props, 'data.config.layout', null) + ' style-' + _.get(this.props, 'data.config.style', null) + ' palette-' + _.get(this.props, 'data.config.palette', null) + ' mode-' + _.get(this.props, 'data.config.mode', null) + ' font-' + _.get(this.props, 'data.config.base_font', null)} />
                </Helmet>
                <div id="site-wrap" className="site">
                	{(_.get(this.props, 'data.config.header.has_anncmnt', null) && _.get(this.props, 'data.config.header.anncmnt_content', null)) && (
                		_.get(this.props, 'data.config.header.anncmnt_is_home_only', null) ? (
                			(_.get(this.props, 'page.__metadata.urlPath', null) === '/') && (
                				<Announcement {...this.props} site={this.props} />
                			)
                		) : 
                			<Announcement {...this.props} site={this.props} />
                	)}
                	<Header {...this.props} />
                	<main id="content" className="site-content">
                		{this.props.children}
                	</main>
                	<Footer {...this.props} />
                </div>
                {(_.get(this.props, 'data.config.header.has_primary_nav', null) || _.get(this.props, 'data.config.header.has_secondary_nav', null)) && (
                <div className="nav-overlay js-nav-toggle" />
                )}
            </React.Fragment>
        );
    }
}
