package ca.mcgill.purposeful.dao;

import ca.mcgill.purposeful.model.Reaction;
import java.util.ArrayList;
import org.springframework.data.repository.CrudRepository;

/**
 * Repository for Reaction
 */

public interface ReactionRepository extends CrudRepository<Reaction, Integer> {

  Reaction findReactionById(String id);

  Reaction findReactionByIdeaAndRegularUser(String idea_id, String user_id);

  Reaction deleteById(String id);

  ArrayList<Reaction> findAllByIdeaId(String idea_id);
  
  ArrayList<Reaction> findAllByRegularUserId(String idea_id);
}
