package com.qterminals.qbill.config.security;

import com.qterminals.qbill.entities.Users;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
public class AppSecurityConfig {

    @Bean
    public MapReactiveUserDetailsService userDetailsService() {
        var user = new Users();
        user.setUsername("nabbasi");
        user.setPassword("x");
        UserDetails userDetails = User.withUserDetails(new CustomUser(new com.qterminals.qbill.entities.Users(user))).build();
        return new MapReactiveUserDetailsService(userDetails);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200", "https://alfurqan.azurewebsites.net"));
        corsConfiguration.setAllowedHeaders(List.of("Accept", "Origin", "X-Requested-With", "Content-Type", "Accept-Language", "X-Auth-Token"
                /*, "Access-Control-Request-Method", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"*/));
        corsConfiguration.setAllowedMethods(List.of("OPTIONS", "GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setExposedHeaders(List.of("Access-Control-Expose-Headers"));
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", corsConfiguration);
        return source;
    }

    /**
     * Following example is taken from EnableWebFluxSecurity
     * @see org.springframework.security.config.annotation.web.reactive.WebFluxSecurityConfiguration
     */
    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        //Add the "/**" following for dev to disable security
        http.cors()/*.configurationSource(this.corsConfigurationSource())*/
                .and().authorizeExchange().pathMatchers("/login","/signup","/api/users/login","/assets/**","/webjars/**", "/**").permitAll()
                .anyExchange().authenticated()
                .and()
                .httpBasic().disable()
                .formLogin().loginPage("/login").and()
                .csrf().disable()//.cors().and()
                .logout().disable();
        return http.build();
    }
}
