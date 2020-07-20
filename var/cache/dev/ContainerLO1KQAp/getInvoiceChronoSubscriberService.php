<?php

namespace ContainerLO1KQAp;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getInvoiceChronoSubscriberService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'App\Events\InvoiceChronoSubscriber' shared autowired service.
     *
     * @return \App\Events\InvoiceChronoSubscriber
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/src/Events/InvoiceChronoSubscriber.php';

        return $container->privates['App\\Events\\InvoiceChronoSubscriber'] = new \App\Events\InvoiceChronoSubscriber(($container->privates['security.helper'] ?? $container->load('getSecurity_HelperService')), ($container->privates['App\\Repository\\InvoiceRepository'] ?? $container->load('getInvoiceRepositoryService')));
    }
}
