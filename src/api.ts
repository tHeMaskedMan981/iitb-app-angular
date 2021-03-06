export const API = {
    UserList: 'api/users',
    User: 'api/users/{uuid}',
    UserFollowedEvents: 'api/users/{uuid}/followed_bodies_events',
    UserMe: 'api/user-me',
    UserMeRoles: 'api/user-me/roles',
    UserMeEventStatus: 'api/user-me/ues/{event}{?status}',

    Events: 'api/events',
    Event: 'api/events/{uuid}',

    Body: 'api/bodies/{uuid}',

    Locations: 'api/locations',

    PostImage: 'api/upload',

    LoggedInUser: 'api/login/get-user',
    Login: 'api/login{?code,redir}',
    Logout: 'api/logout',

    PlacementBlog: 'api/placement-blog{?from,num}',
    TrainingBlog: 'api/training-blog{?from,num}',

    NewsFeed: 'api/news{?from,num}',
    NewsFeedReaction: 'api/user-me/unr/{uuid}{?reaction}'

};
