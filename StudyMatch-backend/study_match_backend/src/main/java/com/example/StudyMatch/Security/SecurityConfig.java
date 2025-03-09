package com.example.StudyMatch.Security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req
                                .requestMatchers("/auth/**",
                                        "/swagger-ui/**",
                                        "/swagger-ui.html",// Full context path
                                        "/api-docs/**",    // Full context path
                                        "/webjars/**",        // Include context path for static resources
                                        "/error"
                                ).permitAll()
                                .requestMatchers(HttpMethod.POST, "/subjects/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/subjects/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "/students/me/**").hasRole("STUDENT")
                                .requestMatchers(HttpMethod.GET, "/students/me/**").hasRole("STUDENT")
                                .requestMatchers(HttpMethod.GET, "/students/{studentId}/**").hasRole("STUDENT")
                                .requestMatchers("/subject/**").authenticated()
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore((request, response, chain) -> {
            logger.debug("Request URI: {}", request.getServletContext());
            chain.doFilter(request, response);
        }, UsernamePasswordAuthenticationFilter.class);
          return http.build();
        //While CSRF protection is crucial for traditional web applications, it might not be necessary for stateless REST APIs. REST APIs typically use other mechanisms such as JWT (JSON Web Token) for authentication and don't rely on cookies for session management. Since CSRF attacks are possible mainly due to the use of cookies, stateless REST APIs can safely disable CSRF protection
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
