package com.abrahambueno.javashoppingcart.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Resource(name = "userService")
    private UserDetailsService userDetailsService;

    public SecurityConfig() {
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService).passwordEncoder(this.encoder());
    }

//    protected void configure(HttpSecurity http) throws Exception {
//        ((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)((HttpSecurity)((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)http.authorizeRequests()
//                .antMatchers(new String[]{"/","/oauth/**","/swagger-ui.html", "/api-docs/**","/users/**"})).permitAll()
////                .antMatchers(new String[]{"/oauth/**"})
////                .antMatchers(new String[]{"/swagger-ui.html"})
////                .antMatchers(new String[]{"/api-docs/**"})
////                .antMatchers(new String[]{"/users/**"})
//                .and())
//                .authorizeRequests()
//                .antMatchers(new String[]{"/console/**"}
//
//                )
//
//
//        )
//
//                .permitAll()
//
//        ;
//        http.csrf().disable();
//        http.headers().frameOptions().disable();
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .anonymous().disable()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS).permitAll()
////                .antMatchers("http://localhost:2019/users/**").permitAll().anyRequest().authenticated()
////                .antMatchers("/users/**").permitAll()
//                .antMatchers("/oauth/**", "/webjars/**").permitAll()
//                .antMatchers("/users/**").permitAll()
//                .antMatchers("/api-docs/**").permitAll()
//        ;
        http
                .authorizeRequests()
                .antMatchers("/oauth/**").permitAll()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/api-docs/**").permitAll()
                .antMatchers("/users/**").permitAll();
//                .antMatchers("/console/**").permitAll()
//                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
//                .antMatchers(HttpMethod.GET, SHOP_URL).permitAll();
        http.csrf().disable();
        http.headers().frameOptions().disable();
    }

    @Bean
    public TokenStore tokenStore() {
        return new InMemoryTokenStore();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
//        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source), new ServletRegistrationBean[0]);
//        bean.setOrder(0);
        return bean;
    }
}