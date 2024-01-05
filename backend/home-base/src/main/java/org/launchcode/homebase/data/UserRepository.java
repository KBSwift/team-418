import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findUsername (String username);
    User findEmail (String email);
    User findPassword (String password);

}