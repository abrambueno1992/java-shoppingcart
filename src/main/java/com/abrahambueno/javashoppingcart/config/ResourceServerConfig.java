package com.abrahambueno.javashoppingcart.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

// disabled until credentials are created
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter
{

    private static final String RESOURCE_ID = "resource_id";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources)
    {
        resources.resourceId(RESOURCE_ID).stateless(false);
    }

    // Need to think about credentials
    @Override
    public void configure(HttpSecurity http) throws Exception
    {
        http.
                anonymous().disable()
                .authorizeRequests()
//                .antMatchers("/users/shopperid/**").access("hasAnyRole('ROLE_USER')")
//                .antMatchers("/users/newuser/**").access("hasAnyRole('ROLE_USER')")
                .antMatchers("/cart/**").access("hasAnyRole('ROLE_USER')")
                .antMatchers("/orders/**").access("hasAnyRole('ROLE_USER')")
//                .antMatchers("/oauth/**").access("hasAnyRole('ROLE_USER')")
                .antMatchers("/products/**").access("hasAnyRole('ROLE_USER')")
                .antMatchers("/suppliers/**").access("hasAnyRole('ROLE_USER')")
                .antMatchers("/shoppers/**").access("hasAnyRole('ROLE_MGR','ROLE_USER')")
//                .antMatchers("/cart/**").access("hasAnyRole('ROLE_MGR','ROLE_USER')")
                .antMatchers("/sections/**").access("hasAnyRole('ROLE_MGR','ROLE_USER')")
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }

//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//        ((HttpSecurity)((ExpressionUrlAuthorizationConfigurer
//                .AuthorizedUrl)((HttpSecurity)http.anonymous()
//                .disable()).authorizeRequests()
//                .antMatchers(new String[]{"/users/**"})).access("hasAnyRole('ROLE_USER')").and())
//                .exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
//    }
}