import os.path
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options


define('port', default=8000, help='run on the given port', type=int)


class Application(tornado.web.Application):

    def __init__(self, *args, **kwargs):
        handlers = [
            (r'/api', APIHandler),
            (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': 'files'}),
        ]

        settings = dict(
            cookie_secret="VERY_SECRET_SECRET",
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
            autoreload=True,
            debug=True,
        )
        settings.update(kwargs)

        tornado.web.Application.__init__(self, handlers, *args, **settings)


class APIHandler(tornado.web.RequestHandler):

    def get(self):
        responce = {'greet': 'hello'}
        self.write(responce)


class NotFoundHandler(tornado.web.RequestHandler):
    
    def prepare(self):  
        ''' for all methods '''
        raise tornado.web.HTTPError(
            status_code=404,
            reason="Invalid resource path"
        )


def main():
    tornado.options.parse_command_line()
    app = Application(default_handler_class=NotFoundHandler)
    app.listen(options.port)

    start_info = 'Server started at :{}'.format(options.as_dict()['port'])
    print(start_info)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
