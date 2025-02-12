package com.example.StudyMatch.models;

import com.example.StudyMatch.auth.Token;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@SuperBuilder(toBuilder = true)
@Entity
@Table(name = "users")
//the principal refers to the currently authenticated user. The principal is an object that represents the user and their authentication state
public class User implements UserDetails, Principal {
    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
    private String password;
    @Column(name = "account_locked", nullable = false)
    private boolean accountLocked = false;
    @Column(name = "account_enabled", nullable = false)
    private boolean accountEnabled = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private RolesEnum role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;



    public String getName() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }
    public String fullName() {
        return firstname + " " + lastname;
    }


}
