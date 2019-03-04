package com.abrahambueno.javashoppingcart.service.impl;

//@Service(value = "userService")
//public class UserServiceImpl implements UserDetailsService, UserService
//{
//
//    @Autowired
//    private UserDao userDao;
//
//    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException
//    {
//        User user = userDao.findByUsername(userId);
//        if (user == null)
//        {
//            throw new UsernameNotFoundException("Invalid username or password.");
//        }
//        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthority());
//    }
//
//    public List<User> findAll()
//    {
//        List<User> list = new ArrayList<>();
//        userDao.findAll().iterator().forEachRemaining(list::add);
//        return list;
//    }
//
//    @Override
//    public void delete(long id)
//    {
//        userDao.deleteById(id);
//    }
//
//    @Override
//    public User save(User user)
//    {
//        return userDao.save(user);
//    }
//}