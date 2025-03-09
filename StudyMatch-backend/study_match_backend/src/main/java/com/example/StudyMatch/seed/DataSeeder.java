package com.example.StudyMatch.seed;

import com.example.StudyMatch.models.Student;
import com.example.StudyMatch.models.User;
import com.example.StudyMatch.repositories.StudentRepository;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Autowired
    private StudentRepository studentRepo;

    public void seedStudents(int count) {
        Faker faker = new Faker();
        for (int i = 0; i < count; i++) {
            Student student = new Student();
            student.setFirstname(faker.name().firstName());
            student.setLastname(faker.name().lastName());
            student.setEmail(faker.internet().emailAddress());
           /* student.setDesiredSkills();
            student.setOfferedSkills(String.join(", ",
                    faker.programmingLanguage().name(),
                    faker.job().keySkills()
            ));*/
            studentRepo.save(student);
        }
    }
}
